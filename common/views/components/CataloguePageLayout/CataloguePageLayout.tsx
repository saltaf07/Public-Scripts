import { FunctionComponent, useEffect, useState } from 'react';
import PageLayout, { Props as PageLayoutProps } from '../PageLayout/PageLayout';
import InfoBanner from '../InfoBanner/InfoBanner';
import { UserInfoProvider } from '@weco/identity/src/frontend/MyAccount/UserInfoContext';
import SignIn from '@weco/catalogue/components/SignIn/SignIn';
import { prefix } from '@weco/identity/src/utility/prefix';

type Props = {
  hideInfoBar?: boolean;
} & PageLayoutProps;

const CataloguePageLayout: FunctionComponent<Props> = ({
  hideInfoBar,
  children,
  ...props
}: Props) => {
  const [isRedirectBannerVisible, setIsRedirectBannerVisible] = useState(false);
  const { showLogin } = props.globalContextData.toggles;
  useEffect(() => {
    if (window.location.search.match('wellcomeImagesUrl')) {
      setIsRedirectBannerVisible(true);
    }
  }, []);

  return (
    <div id="root" data-context-path={prefix}>
      <PageLayout {...props}>
        {hideInfoBar !== true && (
          <>
            {isRedirectBannerVisible && (
              <InfoBanner
                text={[
                  {
                    type: 'paragraph',
                    text: `Coming from Wellcome Images? All freely available images have now been moved to the Wellcome Collection website. Here we're working to improve data quality, search relevance and tools to help you use these images more easily`,
                    spans: [],
                  },
                ]}
                cookieName="WC_wellcomeImagesRedirect"
              />
            )}
          </>
        )}
        {showLogin && (
          <UserInfoProvider>
            <SignIn />
          </UserInfoProvider>
        )}
        {children}
      </PageLayout>
    </div>
  );
};

export default CataloguePageLayout;
