import { font } from '../../../utils/classnames';
import LabelsList from '../LabelsList/LabelsList';
import { UiImage } from '../Images/Images';
import Layout8 from '../Layout10/Layout10';
import Layout12 from '../Layout12/Layout12';
import WobblyBottom from '../WobblyBottom/WobblyBottom';
import { FunctionComponent, ComponentProps, ReactElement } from 'react';
import Space from '../styled/Space';
import PageHeaderStandfirst from '../PageHeaderStandfirst/PageHeaderStandfirst';
import styled from 'styled-components';
import { HTMLString } from '../../../services/prismic/types';

const HeaderWrapper = styled.div`
  background: ${props => props.theme.color('charcoal')};
  color: ${props => props.theme.color('white')};
`;
const TextWrapper = styled.div`
  border-left: 1px solid ${props => props.theme.color('orange')};
`;

type Props = {
  labels: ComponentProps<typeof LabelsList>;
  title: string;
  FeaturedMedia: ReactElement<typeof UiImage> | null;
  standfirst: HTMLString | null;
  // TODO dates
};

const SeasonsHeader: FunctionComponent<Props> = ({
  labels,
  title,
  FeaturedMedia,
  standfirst,
}: Props) => {
  return (
    <Layout12>
      <HeaderWrapper>
        <WobblyBottom color={'white'}>
          {FeaturedMedia && <div className="relative">{FeaturedMedia}</div>}
          <Space
            v={{
              size: 'l',
              properties: ['padding-top', 'padding-bottom'],
            }}
          >
            <Layout8>
              <TextWrapper>
                <Space h={{ size: 'm', properties: ['padding-left'] }}>
                  {labels && labels.labels.length > 0 && (
                    <LabelsList {...labels} labelColor="orange" />
                  )}
                  <Space v={{ size: 'm', properties: ['margin-bottom'] }}>
                    <h1 className={`inline-block no-margin ${font('wb', 1)}`}>
                      {title}
                    </h1>
                    <PageHeaderStandfirst html={standfirst} />
                  </Space>
                </Space>
              </TextWrapper>
            </Layout8>
          </Space>
        </WobblyBottom>
      </HeaderWrapper>
    </Layout12>
  );
};

export default SeasonsHeader;