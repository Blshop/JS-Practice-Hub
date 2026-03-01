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
  id?: string;
};

const Select = ({
  className,
  label,
  elementSize = 'medium',
  id,
  options,
  value,
  defaultValue,
  onChange,
  disabled,
  placeholder = 'Choose option...',
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const containerRef = useRef<HTMLDivElement>(null);
  const generatedId = React.useId();
  const selectId = id ?? generatedId;
  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : internalValue;
  const selectedOption = options.find((opt) => opt.value === selectedValue);
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

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  };

  return (
    <div className={styles.container} ref={containerRef}>
      {label && (
        <label htmlFor={selectId} className={classNames(styles.label, styles[elementSize])}>
          {label}
        </label>
      )}

      <div className={styles.wrapper}>
        <div
          id={selectId}
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
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-disabled={disabled}
        >
          <span className={styles.selectText}>{displayText}</span>
          <span className={styles.arrow} />
        </div>

        {isOpen && (
          <div className={classNames(styles.dropdown, styles[elementSize])}>
            {options.map((option) => (
              <div
                key={option.value}
                className={classNames(styles.option, {
                  [styles.selected]: option.value === selectedValue,
                  [styles.option_disabled]: option.disabled,
                })}
                onClick={() => handleSelect(option.value, option.disabled)}
                role="option"
                aria-selected={option.value === selectedValue}
                aria-disabled={option.disabled}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Select.displayName = 'Select';

export default Select;
