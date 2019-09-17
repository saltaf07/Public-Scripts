// @flow
import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { worksUrl } from '../../../services/catalogue/urls';
import { searchQueryParams } from '../../../services/catalogue/search-params';
import { capitalize } from '../../../utils/grammar';
import { font, classNames } from '../../../utils/classnames';
import ProtoTag from '../styled/ProtoTag';
import Space from '../styled/Space';
import styled from 'styled-components';

const ProtoTab = styled.a.attrs({
  className: classNames({
    'plain-link': true,
    [font('hnm', 5)]: true,
  }),
})`
  padding: 5px 0;
  width: 115px;
  text-align: center;
  display: inline-block;
  background: ${props =>
    props.isActive ? 'white' : props.theme.colors.pumice};
  margin: 2px 2px 0 0;
  transition: background 200ms ease;

  &:hover,
  &:focus {
    background: white;
  }
`;

const workTypes = [
  {
    title: 'texts',
    materialTypes: [
      { title: 'books', letter: 'a' },
      { title: 'e-books', letter: 'v' },
      { title: 'manuscripts, asian', letter: 'b' },
      { title: 'e-manuscripts, asian', letter: 'x' },
      { title: 'journals', letter: 'd' },
      { title: 'e-journals', letter: 'j' },
      { title: 'student dissertations', letter: 'w' },
      { title: 'music', letter: 'c' },
    ],
  },
  {
    title: 'visuals',
    materialTypes: [
      { title: 'pictures', letter: 'k' },
      { title: 'digital images', letter: 'q' },
      { title: 'maps', letter: 'e' },
      { title: 'ephemera', letter: 'l' },
    ],
  },
  {
    title: 'media',
    materialTypes: [
      { title: 'e-videos', letter: 'f' },
      { title: 'e-sound', letter: 's' },
      { title: 'videorecording', letter: 'g' },
      { title: 'sound', letter: 'i' },
      { title: 'cinefilm', letter: 'n' },
    ],
  },
  {
    title: 'objects',
    materialTypes: [
      { title: '3D objects', letter: 'r' },
      { title: 'mixed materials', letter: 'p' },
      { title: 'CD-ROMs', letter: 'm' },
    ],
  },
];

function subcategoriesForWorkType(title: string) {
  const category = workTypes.find(wt => wt.title === title);

  return (category && category.materialTypes) || [];
}

function doArraysOverlap(arr1, arr2) {
  return arr1.some(t => arr2.includes(t));
}

function categoryTitleForWorkTypes(workTypesArray: any[]) {
  const category = categoryForWorkTypes(workTypesArray);

  return category ? category.title : '';
}

function categoryForWorkTypes(workTypesArray) {
  return workTypes.find(wt => {
    const wtLetters = wt.materialTypes.map(a => a.letter);

    return doArraysOverlap(wtLetters, workTypesArray);
  });
}

function updateWorkTypes(workType, subcategory, isFiltering) {
  const activeWorkType = workTypes.find(
    t => t.title === categoryTitleForWorkTypes(workType)
  );

  if (isFiltering) {
    // If you're filtering and about to remove the last filter,
    // we give you all the results for the category
    if (isLastFilterItem(workType, subcategory)) {
      return activeWorkType && activeWorkType.materialTypes.map(t => t.letter);
    }
    // Otherwise add/remove items to the array
    return workType.includes(subcategory.letter)
      ? workType.filter(t => t !== subcategory.letter)
      : workType.concat(subcategory.letter);
  }

  // Not yet filtering, just add the single subcategory
  return [subcategory.letter];
}

function isLastFilterItem(workType, subcategory) {
  return workType.length === 1 && workType.includes(subcategory.letter);
}

function FilterDrawerExplore() {
  const params = searchQueryParams();
  const {
    workType,
    productionDatesFrom,
    productionDatesTo,
    _isFilteringBySubcategory,
  } = params;
  const [fakeIsAvailableOnline, setFakeIsAvailableOnline] = useState(false);
  const [fakeIsAvailableInLibrary, setFakeIsAvailableInLibrary] = useState(
    false
  );
  const [inputDateFrom, setInputDateFrom] = useState(productionDatesFrom);
  const [inputDateTo, setInputDateTo] = useState(productionDatesTo);

  useEffect(() => {
    if (productionDatesFrom !== inputDateFrom) {
      setInputDateFrom(productionDatesFrom);
    }

    if (productionDatesTo !== inputDateTo) {
      setInputDateTo(productionDatesTo);
    }
  }, [productionDatesFrom, productionDatesTo]);

  return (
    <Space v={{ size: 'm', properties: ['margin-top'] }}>
      <Space
        v={{ size: 'l', properties: ['margin-top', 'margin-bottom'] }}
        className={classNames({
          'border-bottom-width-1 border-color-pumice': true,
        })}
      >
        <NextLink
          passHref
          {...worksUrl({
            ...params,
            workType: null,
            page: 1,
          })}
        >
          <ProtoTab isActive={!workType}>Everything</ProtoTab>
        </NextLink>
        {workTypes.map(t => {
          return (
            <NextLink
              passHref
              key={t.title}
              {...worksUrl({
                ...params,
                workType: t.materialTypes.map(m => m.letter),
                page: 1,
              })}
            >
              <ProtoTab
                isActive={
                  !!workType &&
                  doArraysOverlap(t.materialTypes.map(m => m.letter), workType)
                }
              >
                {capitalize(t.title)}
              </ProtoTab>
            </NextLink>
          );
        })}
      </Space>

      {workType && (
        <Space
          v={{ size: 'm', properties: ['margin-top'] }}
          className="flex flex--v-center"
        >
          <span
            className={font('hnm', 5)}
            style={{ minWidth: '100px', display: 'inline-block' }}
          >
            Format{' '}
          </span>
          <div>
            {subcategoriesForWorkType(categoryTitleForWorkTypes(workType)).map(
              subcategory => (
                <NextLink
                  key={subcategory.title}
                  {...worksUrl({
                    ...params,
                    workType: updateWorkTypes(
                      workType,
                      subcategory,
                      _isFilteringBySubcategory
                    ),
                    page: 1,
                    _isFilteringBySubcategory: !isLastFilterItem(
                      workType,
                      subcategory
                    ),
                  })}
                >
                  <ProtoTag
                    as="a"
                    isActive={
                      _isFilteringBySubcategory &&
                      workType.includes(subcategory.letter)
                    }
                  >
                    {subcategory.title}
                  </ProtoTag>
                </NextLink>
              )
            )}
          </div>
        </Space>
      )}

      <Space v={{ size: 'm', properties: ['margin-top'] }}>
        <div
          style={{
            display: 'block',
          }}
        >
          <Space v={{ size: 's', properties: ['margin-top'] }}>
            <span
              className={font('hnm', 5)}
              style={{ minWidth: '100px', display: 'inline-block' }}
            >
              Between{' '}
            </span>
            <label>
              <span className="visually-hidden">from: </span>
              <input
                placeholder={'YYYY'}
                value={inputDateFrom || ''}
                onChange={event => {
                  setInputDateFrom(`${event.currentTarget.value}`);
                }}
                style={{
                  width: '3.3em',
                  padding: '0.3em',
                  border: '0',
                  borderBottom: '2px solid #333',
                  background: 'transparent',
                }}
              />
            </label>{' '}
            <span className={font('hnm', 5)}>and </span>
            <label>
              <span className={'visually-hidden'}>to: </span>
              <input
                placeholder={'YYYY'}
                value={inputDateTo || ''}
                onChange={event => {
                  setInputDateTo(`${event.currentTarget.value}`);
                }}
                style={{
                  width: '3.3em',
                  padding: '0.3em',
                  border: '0',
                  borderBottom: '2px solid #333',
                  background: 'transparent',
                }}
              />
            </label>
            <Space as="span" h={{ size: 'm', properties: ['margin-left'] }}>
              <NextLink
                passHref
                {...worksUrl({
                  ...params,
                  page: 1,
                  productionDatesFrom: inputDateFrom,
                  productionDatesTo: inputDateTo,
                })}
              >
                <ProtoTag as="a">set dates</ProtoTag>
              </NextLink>
            </Space>
            {(productionDatesFrom || productionDatesTo) && (
              <NextLink
                {...worksUrl({
                  ...params,
                  page: 1,
                  productionDatesFrom: null,
                  productionDatesTo: null,
                })}
              >
                <a className={font('hnm', 6)} style={{ marginLeft: '6px' }}>
                  clear date filters
                </a>
              </NextLink>
            )}
          </Space>
        </div>

        <Space v={{ size: 'm', properties: ['margin-top'] }}>
          <span
            className={font('hnm', 5)}
            style={{ minWidth: '100px', display: 'inline-block' }}
          >
            Availability{' '}
          </span>
          <ProtoTag
            onClick={() => {
              setFakeIsAvailableOnline(!fakeIsAvailableOnline);
            }}
            isActive={fakeIsAvailableOnline}
            style={{ cursor: 'pointer' }}
          >
            Online
          </ProtoTag>
          <ProtoTag
            onClick={() => {
              setFakeIsAvailableInLibrary(!fakeIsAvailableInLibrary);
            }}
            isActive={fakeIsAvailableInLibrary}
            style={{ cursor: 'pointer' }}
          >
            In library
          </ProtoTag>
        </Space>
      </Space>
      {(_isFilteringBySubcategory ||
        productionDatesFrom ||
        productionDatesTo ||
        fakeIsAvailableInLibrary ||
        fakeIsAvailableOnline) && (
        <Space v={{ size: 'm', properties: ['margin-top'] }}>
          <NextLink
            passHref
            {...worksUrl({
              ...params,
              workType: null,
              page: 1,
              productionDatesFrom: null,
              productionDatesTo: null,
              _isFilteringBySubcategory: false,
            })}
          >
            <a
              className={font('hnm', 6)}
              onClick={() => {
                setFakeIsAvailableOnline(false);
                setFakeIsAvailableInLibrary(false);
              }}
            >
              clear all filters
            </a>
          </NextLink>
        </Space>
      )}
    </Space>
  );
}

export default FilterDrawerExplore;
