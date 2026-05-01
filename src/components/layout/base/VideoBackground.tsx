'use client';

import { ComponentProps, ReactNode, useEffect, useRef, useState } from 'react';
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
  /** optionally set video position to fixed for a parallaxing effect */
  isParallax?: boolean;
}

export function VideoBackground({
  children,
  className,
  isParallax = false,
  background = '/hero-water.jpg',
  containerProps,
  ...rest
}: VideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (isParallax && containerRef.current) {
      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;

        if (videoRef.current) {
          entry.isIntersecting ? videoRef.current.play() : videoRef.current.pause();
        }
      });

      observer.observe(containerRef.current);

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className={`-z-10 absolute inset-0 object-cover bg-center bg-fixed`}
        style={{ backgroundImage: `url(${background})` }}
        {...containerProps}
      ></div>
      <video
        ref={videoRef}
        controls={false}
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
        onCanPlay={() => setIsLoaded(true)}
        className={twMerge(
          `
          -z-10 inset-0 ${isParallax ? 'fixed top-(--header-h)' : 'absolute'} object-cover w-full h-full
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
