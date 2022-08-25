import { gql } from '@apollo/client';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { client } from 'utils/apollo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page } = req.query;
  const GET_NEXT_ANIME_LIST = gql`
    {
      Page(page: ${page}, perPage: 12) {
        pageInfo {
          currentPage
          hasNextPage
        }
        media(type: ANIME, sort: TRENDING_DESC) {
          id
          coverImage {
            extraLarge
            color
          }
          title {
            english
            romaji
            native
          }
          status
          nextAiringEpisode {
            episode
            timeUntilAiring
          }
          seasonYear
          endDate {
            year
          }
          meanScore
          studios {
            edges {
              node {
                id
                name
                isAnimationStudio
              }
            }
          }
          format
          episodes
          genres
        }
      }
    }
  `;
  const { data } = await client.query({ query: GET_NEXT_ANIME_LIST });
  res.status(200).json(data);
}
