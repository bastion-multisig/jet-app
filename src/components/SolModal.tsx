import { useLanguage } from '../contexts/localization/localization';
import { Modal } from 'antd';
import { AssetLogo } from './AssetLogo';
import { useTradeContext } from '../contexts/tradeContext';

export const MinSolModal: React.FC = () => {
  const { dictionary } = useLanguage();
  const { minSolModal, setMinSolModal, currentPool } = useTradeContext();

  // useEffect(() => {
  //   if (currentPool?.symbol && currentToken !== currentPool.symbol) {
  //     fetchProtocols(currentPool.symbol);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentToken, currentPool]);

  if (!currentPool?.symbol) {
    return null;
  }
  return (
    <Modal footer={null} visible={minSolModal} className="radar-modal" onCancel={() => setMinSolModal(false)}>
      <div className="radar-modal-header flex-centered"></div>
      <div className="radar-modal-asset flex-centered">
        <AssetLogo symbol={currentPool?.symbol} height={30} style={{ marginRight: 5 }} />
        <h1>Warning</h1>
      </div>
      <div className="radar-loader">
        <p>You are depositing all your SOL.</p>
      </div>
    </Modal>
  );
};
