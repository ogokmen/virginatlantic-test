/** @jsx h */
import { h, options } from 'preact';
import * as styles from './select.module.less';

export type Option = {
  value: string;
  description: string;
};

type SelectProps = {
  label: string;
  name: string;
  id: string;
  options: Option[];
  value: string;
  required?: boolean;
  onChange?: (any) => void;
};

export const SelectComponent = (props: SelectProps) => {
  const handleOnChange = ({ target }) => {
    if (props.onChange) props.onChange(target);
  };

  return (
    <div className={styles['select-component']}>
      <label for={props?.id}>{props?.label}</label>
      <select value={props?.value} name={props?.name} id={props?.id} required={props?.required} onChange={handleOnChange}>
        <option value="">Please select</option>
        {props?.options.map((option: Option) => (
          <option value={option?.value} selected={option.value === props?.value}>
            {option?.description}
          </option>
        ))}
      </select>
    </div>
  );
};
