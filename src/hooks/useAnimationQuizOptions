import { useEffect, useState } from "react";

interface UseAnimationQuizOptionsProps {
  options: string[];
}

const useAnimatedOuizOptions = ({ options }: UseAnimationQuizOptionsProps) => {
  const [animatedOptions, setAnimatedOptions] = useState<string[]>([]);

  useEffect(() => {
    // Reset the animations
    setAnimatedOptions([]);

    // Trigger animations with a delay
    options.forEach((option, index) => {
      setTimeout(() => {
        setAnimatedOptions(prev => [...prev, option]);
      }, index * 100);
    });
  }, [options]);

  return animatedOptions;
};

export default useAnimatedOuizOptions;
