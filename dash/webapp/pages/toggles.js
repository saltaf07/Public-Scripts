// @flow
import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import getCookies from 'next-cookies';
import fetch from 'isomorphic-unfetch';
import Header from '../components/Header';

const fontFamily = 'Gadget, sans-serif';

const Button = styled.button`
  border: ${props => (props.opaque ? 'none' : '2px solid #007868')};
  color: ${props => (props.opaque ? 'black' : '#007868')};
  display: inline-block;
  border-radius: 2px;
  padding: 6px 10px;
  transition: background 150ms ease;
  cursor: pointer;
  margin-right: 18px;
`;

const ResetButton = styled(Button)`
  color: #5f0000;
  background-color: #fcdddd;
  padding: 8px 12px;
  margin: 10px 0;
  font-size: 1.03rem;
`;

const Status = styled.div`
  width: 10px;
  height: 10px;
  margin-left: 10px;
  margin-right: 5px;
  border-radius: 50%;
  background: ${props => (props.active ? 'green' : 'lightgrey')};
`;

const TextBox = styled.p`
  border: 1px solid rgba(92, 184, 191, 1);
  background: rgba(92, 184, 191, 0.25);
  padding: 6px 12px;
  margin: 0;
`;

const aYear = 31536000;
function setCookie(name, value) {
  const expiration = value
    ? ` Max-Age=${aYear}`
    : `Expires=${new Date(0).toString()}`;
  document.cookie = `toggle_${name}=${value ||
    ''}; Path=/; Domain=wellcomecollection.org; ${expiration}`;
}

type Toggle = {|
  id: string,
  title: string,
  defaultValue: boolean,
  description: string,
|};

type ToggleStates = { [id: string]: boolean };

type AbTest = {|
  id: string,
  title: string,
  range: [number, number],
  defaultValue: boolean,
  description: string,
|};

const IndexPage = () => {
  const [toggleStates, setToggleStates] = useState<ToggleStates>({});
  const [toggles, setToggles] = useState<Toggle[]>([]);
  const [abTests, setAbTests] = useState<AbTest[]>([]);

  // We use this over getInitialProps as it's ineffectual when an app is
  // exported.
  useEffect(() => {
    fetch('https://toggles.wellcomecollection.org/toggles.json')
      .then(resp => resp.json())
      .then(json => {
        setToggles(json.toggles);
        setAbTests(json.tests);
      });

    const cookies = getCookies({});
    const initialToggles = Object.keys(cookies).reduce((acc, key) => {
      if (key.startsWith('toggle_')) {
        acc[key.replace('toggle_', '')] = cookies[key] === 'true';
      }
      return acc;
    }, {});
    setToggleStates(initialToggles);
  }, []);

  const reset = useCallback(
    () =>
      setToggleStates(
        toggles.reduce((state, { id, defaultValue }) => {
          setCookie(id, null);
          state[id] = defaultValue;
          return state;
        }, {})
      ),
    [toggles]
  );

  return (
    <div
      style={{
        fontFamily,
      }}
    >
      <Header title={'Toggles'} />
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
          }}
        >
          <h2 style={{ flexGrow: 1 }}>Feature toggles</h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          />
        </div>
        <TextBox>
          You can turn on a toggle on (????) or off (????). Toggles also have a
          public status which is set for 100% of users.
        </TextBox>
        <ResetButton onClick={reset}>
          ????&nbsp;&nbsp;Reset all toggles to default&nbsp;&nbsp;????
        </ResetButton>
        {toggles.length > 0 && (
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {toggles.map(toggle => (
              <li
                key={toggle.id}
                style={{
                  marginTop: '18px',
                  borderTop: '1px solid #d9d6ce',
                  paddingTop: '6px',
                }}
              >
                <h3
                  style={{ marginRight: '6px', marginBottom: '5px' }}
                  id={`toggle-${toggle.id}`}
                >
                  {toggle.title}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '12px',
                    color: 'grey',
                  }}
                >
                  Public status: <Status active={toggle.defaultValue} />{' '}
                  {toggle.defaultValue === true ? 'on' : 'off'}
                </div>
                <p>{toggle.description}</p>
                <Button
                  onClick={() => {
                    setCookie(toggle.id, 'true');
                    setToggleStates(() => ({
                      ...toggleStates,
                      [toggle.id]: true,
                    }));
                  }}
                  style={{
                    opacity: toggleStates[toggle.id] === true ? 1 : 0.5,
                  }}
                >
                  ???? On
                </Button>
                <Button
                  onClick={() => {
                    setCookie(toggle.id, 'false');
                    setToggleStates(() => ({
                      ...toggleStates,
                      [toggle.id]: false,
                    }));
                  }}
                  style={{
                    opacity: toggleStates[toggle.id] === false ? 1 : 0.5,
                  }}
                >
                  ???? Off
                </Button>
              </li>
            ))}
          </ul>
        )}
        {toggles.length === 0 && <p>None for now, check back later???</p>}

        <hr />

        <h2>A/B tests</h2>
        <TextBox>
          You can opt-in to a test (????), explicitly opt-out (????), or have us
          forget your choice. If you choose for use to forget, you will be put
          in to either group randomly according to our A/B decision rules.
        </TextBox>
        {abTests.length > 0 && (
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {abTests.map(toggle => (
              <li
                key={toggle.id}
                style={{
                  marginTop: '18px',
                  borderTop: '1px solid #d9d6ce',
                  paddingTop: '6px',
                }}
              >
                <h3
                  style={{ marginRight: '6px', marginBottom: '5px' }}
                  id={`toggle-${toggle.id}`}
                >
                  {toggle.title}{' '}
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    ({toggle.range[0]} - {toggle.range[1]})
                  </span>
                </h3>
                <p>{toggle.description}</p>
                <Button
                  onClick={() => {
                    setCookie(toggle.id, 'true');
                    setToggleStates({
                      ...toggleStates,
                      [toggle.id]: true,
                    });
                  }}
                  style={{
                    opacity: toggleStates[toggle.id] === true ? 1 : 0.5,
                  }}
                >
                  ???? Count me in
                </Button>
                <Button
                  onClick={() => {
                    setCookie(toggle.id, 'false');
                    setToggleStates({
                      ...toggleStates,
                      [toggle.id]: false,
                    });
                  }}
                  style={{
                    opacity: toggleStates[toggle.id] === false ? 1 : 0.5,
                  }}
                >
                  ???? No thanks
                </Button>
                <Button
                  onClick={() => {
                    setCookie(toggle.id, null);
                    setToggleStates({
                      ...toggleStates,
                      [toggle.id]: undefined,
                    });
                  }}
                  opaque
                >
                  Forget my choice
                </Button>
              </li>
            ))}
          </ul>
        )}

        {abTests.length === 0 && <p>None for now, check back later???</p>}
      </div>
    </div>
  );
};

export default IndexPage;
