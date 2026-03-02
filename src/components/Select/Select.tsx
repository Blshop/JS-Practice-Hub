import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Select.module.scss';

export type SelectSize = 'small' | 'medium' | 'large';

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  elementSize?: SelectSize;
  label?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

const Select = ({
  className,
  label,
  elementSize = 'medium',
  options,
  value,
  defaultValue,
  onChange,
  disabled,
  placeholder = '',
  ...props
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;
  const selectedOption = options.find((option) => option.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string, optionDisabled?: boolean) => {
    if (optionDisabled) return;

    if (!isControlled) {
      setInternalValue(optionValue);
    }

    setIsOpen(false);

    if (onChange) {
      onChange(optionValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setHighlightedIndex(options.findIndex((opt) => opt.value === selectedValue));
        } else {
          setHighlightedIndex((prev) => {
            if (prev === null) return 0;
            let next = prev + 1;

            while (next < options.length && options[next].disabled) {
              next++;
            }

            if (next >= options.length) next = 0;

            return next;
          });
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setHighlightedIndex(options.findIndex((opt) => opt.value === selectedValue));
        } else {
          setHighlightedIndex((prev) => {
            if (prev === null) return options.length - 1;
            let next = prev - 1;

            while (next >= 0 && options[next].disabled) {
              next--;
            }

            if (next < 0) next = options.length - 1;

            return next;
          });
        }
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (isOpen && highlightedIndex !== null) {
          const opt = options[highlightedIndex];

          if (!opt.disabled) {
            handleSelect(opt.value, opt.disabled);
          }
        } else {
          setIsOpen(!isOpen);

          if (!isOpen) {
            setHighlightedIndex(options.findIndex((opt) => opt.value === selectedValue));
          }
        }
        break;

      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {label && <div className={classNames(styles.label, styles[elementSize])}>{label}</div>}

      <div className={styles.wrapper}>
        <div
          className={classNames(
            styles.select,
            styles[elementSize],
            {
              [styles.disabled]: disabled,
              [styles.open]: isOpen,
            },
            className,
          )}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          {...props}
        >
          <span className={styles.select_text}>{displayText}</span>
          <span className={styles.arrow} />
        </div>

        {isOpen && (
          <div className={classNames(styles.dropdown, styles[elementSize])}>
            <div className={classNames(styles.dropdown_inner, styles[elementSize])}>
              {options.map((option, index) => (
                <div
                  key={option.value}
                  className={classNames(styles.option, {
                    [styles.selected]: option.value === selectedValue,
                    [styles.disabled]: option.disabled,
                    [styles.hover]: index === highlightedIndex,
                  })}
                  onClick={() => handleSelect(option.value, option.disabled)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Select.displayName = 'Select';

export default Select;
