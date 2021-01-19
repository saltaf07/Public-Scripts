import React, { FunctionComponent } from 'react';

import CheckboxRadio from '../CheckboxRadio/CheckboxRadio';
import Space from '../styled/Space';
import { classNames } from '../../../utils/classnames';

type Props = {
  name: string;
  selected: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    id: string;
    label: string;
  }[];
};

const RadioGroup: FunctionComponent<Props> = ({
  name,
  selected,
  onChange,
  options,
}: Props) => (
  <div>
    {options.map(({ value, label, id }, index) => (
      <Space
        key={value}
        v={{ size: 'm', properties: ['padding-top', 'padding-bottom'] }}
        h={
          index !== options.length - 1
            ? { size: 'm', properties: ['margin-right'] }
            : undefined
        }
        className={classNames({
          'flex-inline flex--h-center': true,
        })}
      >
        <CheckboxRadio
          id={id}
          text={label}
          type={`radio`}
          name={name}
          value={value}
          checked={selected === value}
          onChange={() => onChange(value)}
        />
      </Space>
    ))}
  </div>
);

export default RadioGroup;
