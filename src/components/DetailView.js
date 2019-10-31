import React from 'react';

import styled from 'styled-components';
import {Box, Text, Link} from 'rebass/styled-components';

import GoogleMaps from './GoogleMaps';

const DetailsTitle = styled(Box)`
  height: 120px;
  background-color: rgba(52, 179, 121, 1);
  padding: 2em 1.563em;
  margin-bottom: 1em;
  p {
    color: rgba(255, 255, 255, 1);
    font-size: 1.5rem;
    margin: 0;
    padding-bottom: 6px;

    &:last-child {
      font-size: 1.125rem;
    }
  }
`;

const DetailsMeta = styled(Box)`
  padding: 0 1.563em;
  p {
    margin: 0;
    padding-bottom: 26px;
  }
`;

const DetailView = ({current = {}, ...props}) => {
  const {
    name,
    category,
    contact,
    location: {formattedAddress: [street, city] = []} = {},
  } = current;

  return (
    <>
      <GoogleMaps {...current} {...props} />
      <Box className="details">
        <DetailsTitle className="details-container__title">
          <p>{name}</p>
          <p>{category}</p>
        </DetailsTitle>
        <DetailsMeta className="details-container__meta">
          <Text as="p">
            {street}
            <br />
            {city}
          </Text>
          {contact && contact.formattedPhone && (
            <Text as="p">{contact.formattedPhone}</Text>
          )}
          {contact && contact.twitter && (
            <Text as="p">
              <Link
                href={`https://twitter.com/${contact.twitter}`}
                target="_blank"
                rel="noopener"
              >
                @{contact.twitter}
              </Link>
            </Text>
          )}
        </DetailsMeta>
      </Box>
    </>
  );
};

export {DetailView};
