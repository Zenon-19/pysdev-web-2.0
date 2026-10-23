import React from 'react';
import { Testimonials, TestimonialsProps } from './Testimonials';

export interface TestimonialsGridProps extends TestimonialsProps {}

/**
 * TestimonialsGrid Component
 * Re-exports the balanced Testimonials component for backward compatibility.
 */
export const TestimonialsGrid: React.FC<TestimonialsGridProps> = (props) => {
  return <Testimonials {...props} />;
};

export default TestimonialsGrid;

