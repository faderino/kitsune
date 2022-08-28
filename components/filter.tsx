import * as colors from '@/styles/colors';

interface FilterGroupProps {
  label: string;
  children: React.ReactNode;
}
function FilterGroup({ label, children }: FilterGroupProps) {
  return (
    <div>
      <div
        css={{
          padding: '10px 0 ',
          fontSize: '0.9rem',
          fontWeight: '500',
          color: colors.textLighten,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

interface FilterProps {
  prependIcon?: React.ReactNode;
  appendIcon?: React.ReactNode;
}
function SearchInput({ prependIcon, appendIcon }: FilterProps) {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '6px',
        padding: '11px 16px',
        background: colors.filter,
        boxShadow: `0 14px 30px rgba(${colors.shadow}, 0.1), 0 4px 4px rgba(${colors.shadow}, 0.04)`,
      }}
    >
      {prependIcon ?? ''}
      <input
        type="text"
        css={{
          flexShrink: 1,
          outline: 'none',
          border: 'none',
          width: '100%',
          fontWeight: '500',
          color: colors.textLight,
          background: 'inherit',
        }}
      />
      {appendIcon ?? ''}
    </div>
  );
}

function FilterInput({ prependIcon, appendIcon }: FilterProps) {
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '6px',
        padding: '11px 16px',
        background: colors.filter,
        boxShadow: `0 14px 30px rgba(${colors.shadow}, 0.1), 0 4px 4px rgba(${colors.shadow}, 0.04)`,
      }}
    >
      {prependIcon ?? ''}
      <input
        type="text"
        placeholder="Any"
        css={{
          flexShrink: 1,
          outline: 'none',
          border: 'none',
          width: '100%',
          background: 'inherit',
          cursor: 'text',

          '&, ::placeholder': {
            fontWeight: '500',
            color: colors.textLight,
          },
        }}
      />
      {appendIcon ?? ''}
    </div>
  );
}

export { FilterGroup, FilterInput, SearchInput };
