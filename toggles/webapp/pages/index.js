// @flow
const fontFamily = 'Gadget, sans-serif';

// Think about making a tools layout?
// Maybe pa11y could use this?
const Header = () => {
  return (
    <div style={{
      background: '#ffce3c',
      marginTop: '30px',
      marginBottom: '30px',
      position: 'relative',
      height: '60px',
      display: 'flex'
    }}>
      <h1 style={{ margin: 0, padding: 0 }}>
        <img
          src='https://i.wellcomecollection.org/assets/icons/android-chrome-512x512.png'
          width={90}
          height={90}
          alt={'Wellcome Collection logo'}
          title={'Wellcome Collection'}
          style={{
            marginTop: '-15px',
            marginLeft: '18px'
          }} />
      </h1>

      <h2 style={{
        margin: 0,
        padding: 0,
        marginLeft: '18px',
        color: '#323232',
        weight: 'normal',
        lineHeight: '2.5em'
      }}>Toggles</h2>
    </div>
  );
};

const aYear = 31536000;
function setCookie(name, value) {
  const expiration = value ? ` Max-Age=${aYear}` : `Expires=${new Date('1970-01-01').toString()}`;
  document.cookie = `toggle_${name}=${value || ''}; Path=/; Domain=wellcomecollection.org; ${expiration}`;
}
const IndexPage = () => {
  return (
    <div style={{
      fontFamily
    }}>
      <Header />
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2>A/B tests</h2>
        <ul>
          <li>
            <span style={{marginRight: '6px'}}>Outro</span>
            <button onClick={() => {
              setCookie('outro', 'true');
            }}>On</button>
            <button onClick={() => {
              setCookie('outro', 'false');
            }}>Off</button>
            <button onClick={() => {
              setCookie('outro');
            }}>Leave</button>
          </li>
        </ul>
        <h2>Feature toggles</h2>
        <p>Check back later…</p>
      </div>
    </div>
  );
};

export default IndexPage;