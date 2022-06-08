import { useTradeContext } from '../contexts/tradeContext';
import { currencyFormatter } from '../utils/currency';
import { Input } from 'antd';
import { AssetLogo } from './AssetLogo';
import { ReactComponent as ArrowIcon } from '../styles/icons/arrow_icon.svg';
import { LoadingOutlined } from '@ant-design/icons';

export function JetInput(props: {
  type: 'text' | 'number';
  value: string | number | null;
  placeholder?: string;
  currency?: boolean;
  maxInput?: number | null;
  error?: string | null;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => unknown;
  onChange: (value: any) => unknown;
  submit: () => unknown;
}): JSX.Element {
  const { currentPool } = useTradeContext();

  return (
    <div className={`jet-input flex-centered ${props.disabled ? 'disabled' : ''}`}>
      <div className={`flex-centered ${props.currency ? 'currency-input' : ''}`}>
        <Input
          type={props.type}
          disabled={props.disabled}
          value={props.value || ''}
          placeholder={props.error || props.placeholder}
          className={props.error ? 'error' : ''}
          onClick={() => (props.onClick ? props.onClick() : null)}
          onChange={e => props.onChange(e.target.value)}
          onPressEnter={() => props.submit()}
        />
        {props.currency && currentPool && currentPool.tokenConfig && (
          <>
            <AssetLogo symbol={currentPool.tokenConfig.symbol} height={20} />
            <div className="asset-abbrev-usd flex align-end justify-center column">
              <span>{currentPool.tokenConfig.symbol}</span>
              <span>
                ≈{' '}
                {currencyFormatter(
                  (Number(props.value) ?? 0) * (currentPool.tokenPrice !== undefined ? currentPool.tokenPrice : 0),
                  true,
                  2
                )}
              </span>
            </div>
          </>
        )}
      </div>
      <div
        className={`input-btn flex-centered ${props.loading ? 'loading' : ''}`}
        onClick={() => {
          if (!props.disabled) {
            props.submit();
          }
        }}>
        {props.loading ? <LoadingOutlined /> : <ArrowIcon width={30} />}
      </div>
    </div>
  );
}
