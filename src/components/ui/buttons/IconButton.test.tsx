import { expect, test, } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IconButton } from './IconButton';
import svg from "@/assets/icons/no.svg"
import Image from 'next/image';

test('Components > UI > Buttons > IconButton', () => {
  render(<IconButton icon={<Image src={svg} fill alt="alt text"/>} label='my label'/>);
  expect(screen.getByRole('button')).toBeDefined();
  expect(screen.getByRole('img')).toBeDefined();
  expect(screen.getByRole('paragraph')).toBeDefined();
  expect(screen.getByAltText('alt text')).toBeDefined();
});
