'use client';

import { ComponentProps, ReactNode, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface VideoBackgroundProps extends ComponentProps<'video'> {
  /**
   * You must include <source ... /> and optionally <track ... /> for subtitles as children in this component
   *
   * @example
   * ```tsx
   * <VideoBackground>
   *  <source src="/path/to/video.mp4" type="video/mp4" />
      <track src="/path/to/captions.vtt" kind="subtitles" srcLang="en" label="English" />
   * <VideoBackground />
   * ```
   * {@link https://nextjs.org/docs/app/guides/videos}
   */
  children: ReactNode;
  /** Opionally change the default background image to be used until the video has loaded */
  background?: string;
  /** This prop lets you access the div element containing the video element */
  containerProps?: ComponentProps<'div'>;
}

export function VideoBackground({
  children,
  className,
  background = '/hero-water.jpg',
  containerProps,
  ...rest
}: VideoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <>
      <div
        className={`-z-10 absolute inset-0 object-cover bg-center bg-fixed`}
        style={{ backgroundImage: `url(${background})` }}
        {...containerProps}
      ></div>
      <video
        controls={false}
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
        onCanPlay={() => setIsLoaded(true)}
        className={twMerge(
          `
          absolute -z-10 inset-0 object-cover w-full h-full
          ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-[2s]
          `,
          className
        )}
        {...rest}
      >
        {children}
      </video>
    </>
  );
}
