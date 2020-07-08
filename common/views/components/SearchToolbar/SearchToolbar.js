// @flow
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import swagger from '../../../services/catalogue/swagger';
import Layout12 from '../Layout12/Layout12';
import Icon from '../Icon/Icon';
import Space from '../styled/Space';
import { classNames, font } from '../../../utils/classnames';
import cookies from 'next-cookies';
import Toggler from '../Toggler/Toggler';

const Form = styled(Space).attrs({
  className: classNames({
    flex: true,
    [font('hnl', 5)]: true,
  }),
  h: {
    size: 's',
    properties: ['padding-left', 'padding-right'],
  },
  v: { size: 's', properties: ['padding-top', 'padding-bottom'] },
  as: 'form',
})`
  border-bottom: 1px solid ${props => `${props.theme.color('charcoal')}`};
  background: ${props => props.theme.color('yellow')};
  align-items: center;
`;

const Heading = styled(Space).attrs({
  as: 'h2',
  className: classNames({
    'no-margin': true,
    [font('hnm', 4)]: true,
  }),
  h: {
    size: 's',
    properties: ['padding-right', 'margin-right'],
  },
})`
  border-right: 1px solid ${props => `${props.theme.color('charcoal')}`};
`;

const Section = styled.div`
  padding-right: 5px;
  margin-right: 5px;
  border-right: 1px solid ${props => `${props.theme.color('charcoal')}`};
`;

const Input = styled(Space).attrs({
  as: 'input',
  h: {
    size: 's',
    properties: ['margin-right'],
  },
})``;

const SearchToolbar = () => {
  const [queryTypes, setQueryTypes] = useState<string[]>([]);
  const [selectedQueryType, setSelectedQueryType] = useState<?string>(null);

  useEffect(() => {
    const queryTypeCookie = cookies({})._queryType;
    if (queryTypeCookie) {
      setSelectedQueryType(queryTypeCookie);
    }
  }, []);

  useEffect(() => {
    swagger().then(swagger => {
      const queryTypesEnum = swagger.paths['/works'].get.parameters.find(
        parameter => parameter.name === '_queryType'
      ).schema.enum;

      setQueryTypes(queryTypesEnum);
    });
  }, []);

  return (
    <Layout12>
      <Form>
        <div
          className="flex"
          style={{
            alignItems: 'center',
          }}
        >
          <Heading>🔍 Search</Heading>
          <Section>
            <div className="flex">
              <div>Query type:</div>

              {queryTypes.map(queryType => (
                <label key={queryType}>
                  <Space
                    h={{
                      size: 'm',
                      properties: ['margin-left'],
                    }}
                    className={classNames({
                      flex: true,
                    })}
                  >
                    <Input
                      type="radio"
                      name="seachToolbarQueryType"
                      value={queryType}
                      checked={queryType === selectedQueryType}
                      onChange={event => {
                        const val = event.currentTarget.value;
                        setSelectedQueryType(val);
                        document.cookie = `_queryType=${val}; path=/; max-age=31536000`;
                        window.location.reload();
                      }}
                    />
                    {queryType}
                  </Space>
                </label>
              ))}
            </div>
          </Section>
        </div>
        <div style={{ flexGrow: 1 }}>
          <Toggler name="collectionSearch" label="Include collection search" />
        </div>
        <a
          href="https://docs.wellcomecollection.org/catalogue/search_relevance/tests"
          className={classNames({
            flex: true,
          })}
        >
          <Space
            h={{
              size: 'xs',
              properties: ['margin-right'],
            }}
            v={{
              size: 'xs',
              properties: ['padding-top'],
            }}
          >
            <Icon name="info2" title="Docs" />
          </Space>
        </a>
      </Form>
    </Layout12>
  );
};

export default SearchToolbar;
