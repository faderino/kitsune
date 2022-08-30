import * as colors from '@/styles/colors';
import { Character } from 'types/anime';

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <div
      css={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderRadius: '3px',
        overflow: 'hidden',
        height: '80px',
        background: colors.white,
      }}
    >
      <div
        css={{
          display: 'inline-grid',
          gridTemplateColumns: '60px 1fr',
        }}
      >
        <div
          style={{ backgroundImage: `url(${character.node.image.medium})` }}
          css={{
            width: '100%',
            backgroundPosition: '50%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        ></div>
        <div
          css={{
            padding: '10px',
          }}
        >
          <div
            css={{
              fontSize: '0.8rem',
              height: '48px',
            }}
          >
            {character.node.name.full}
          </div>
          <div css={{ color: colors.textLight, fontSize: '0.6rem' }}>
            {character.role}
          </div>
        </div>
      </div>

      <div
        css={{
          display: 'inline-grid',
          gridTemplateColumns: '1fr 60px',
        }}
      >
        <div
          css={{
            padding: '10px',
            textAlign: 'right',
          }}
        >
          <div
            css={{
              fontSize: '0.8rem',
              height: '48px',
            }}
          >
            {character.voiceActors[0]?.name.full}
          </div>
          <div css={{ color: colors.textLight, fontSize: '0.6rem' }}>
            {character.voiceActors[0]?.language}
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${character.voiceActors[0]?.image.medium})`,
          }}
          css={{
            width: '100%',
            backgroundPosition: '50%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        ></div>
      </div>
    </div>
  );
}
