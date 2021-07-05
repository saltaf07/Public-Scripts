import styled from 'styled-components';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import HueSlider from './HueSlider';
import { hexToHsv, hsvToHex } from './conversions';

type Props = {
  name: string;
  color?: string;
  onChangeColor: (color?: string) => void;
};

type Hue = 'red' | 'yellow' | 'blue' | 'orange' | 'green' | 'violet' | 'red-orange' | 'yellow-orange' | 'yellow-green' | 'blue-green';

type ColorSwatch = {
  hexValue: string;
  colorName: string | null;
  colorHue: Hue | null;
}
const palette: ColorSwatch[] = [
  {
    hexValue: 'e02020',
    colorName: 'red',
    colorHue: 'red',
  },
  {
    hexValue: 'ff47d1',
    colorName: 'pink',
    colorHue: 'red',
  },
  {
    hexValue: 'fa6400',
    colorName: 'orange',
    colorHue: 'orange',
  },
  {
    hexValue: 'f7b500',
    colorName: 'yellow',
    colorHue: 'yellow',
  },
  {
    hexValue: '8b572a',
    colorName: 'brown',
    colorHue: 'orange',
  },
  {
    hexValue: '6dd400',
    colorName: 'green',
    colorHue: 'green',
  },
  {
    hexValue: '22bbff',
    colorName: 'blue',
    colorHue: 'blue',
  },
  {
    hexValue: '8339e8',
    colorName: 'violet',
    colorHue: 'violet',
  },
  {
    hexValue: '000000',
    colorName: 'black',
    colorHue: null,
  },
  {
    hexValue: 'd9d3d3',
    colorName: 'grey',
    colorHue: null,
  },
];

const Wrapper = styled.div`
  padding-top: 6px;
  max-width: 250px;
`;

const Swatches = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Swatch = styled.button.attrs({ type: 'button' })<{
  color: string;
  selected: boolean;
}>`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  display: inline-block;
  background-color: ${({ color }) => `#${color}`};
  margin: 4px;
  border: ${({ selected }) => (selected ? '3px solid #555' : 'none')};
`;

const Slider = styled(HueSlider)`
  margin-top: 15px;
`;

const ColorLabel = styled.label<{ active: boolean }>`
  font-style: italic;
  color: ${({ active }) => (active ? '#121212' : '#565656')};
  font-size: 14px;
`;

const ClearButton = styled.button.attrs({ type: 'button' })`
  border: 0;
  padding: 0;
  background: none;
  text-decoration: underline;
  color: #121212;
  font-size: 12px;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const PaletteColorPicker: FunctionComponent<Props> = ({
  name,
  color,
  onChangeColor,
}) => {
  // Because the form is not controlled we need to maintain state internally
  const [colorState, setColorState] = useState(color);
  const firstRender = useRef(true);

  useEffect(() => {
    setColorState(color);
  }, [color]);

  useEffect(() => {
    if (!firstRender.current) {
      onChangeColor(color);
    } else {
      firstRender.current = false;
    }
  }, [colorState]);

  return (
    <Wrapper>
      <input type="hidden" name={name} value={colorState || ''} />
      <Swatches>
        {palette.map(swatch => (
          <Swatch
            key={swatch.hexValue}
            color={swatch.hexValue}
            selected={colorState === swatch.hexValue}
            onClick={() => setColorState(swatch.hexValue)}
          />
        ))}
      </Swatches>
      <Slider
        hue={hexToHsv(colorState || palette[0].hexValue).h}
        onChangeHue={h => setColorState(hsvToHex({ h, s: 80, v: 90 }))}
      />
      <TextWrapper>
        <ColorLabel active={!!colorState}>
          {colorState ? `#${colorState.toUpperCase()}` : 'None'}
        </ColorLabel>
        <ClearButton onClick={() => setColorState(undefined)}>
          Clear
        </ClearButton>
      </TextWrapper>
    </Wrapper>
  );
};

export default PaletteColorPicker;
