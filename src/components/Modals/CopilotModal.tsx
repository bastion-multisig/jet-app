import { useEffect, useState } from 'react';
import { useLanguage, definitions } from '../../contexts/localization/localization';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAlert, useDefinition } from '../../contexts/Modals/copilotModal';
import { Modal, Button } from 'antd';
import { HealthBar } from '../BorrowView/HealthBar';

export function CopilotModal(): JSX.Element {
  const { connected } = useWallet();
  const { language, dictionary } = useLanguage();
  const { alert, setAlert } = useAlert();
  const { definition, setDefinition } = useDefinition();
  const [collateralDetail, setCollateralDetail] = useState(false);

  // Using this to check if we're currently on c-ratio definition
  // would be better to add a 'key' property to each definition and just check that.
  useEffect(() => {
    setCollateralDetail(false);
    for (const key of Object.keys(definitions[language])) {
      if (key === 'collateralizationRatio' && definitions[language][key].term === definition?.term) {
        setCollateralDetail(true);
      }
    }
  }, [definition, language]);

  return (
    <>
      {/* Alert Modal */}
      <Modal
        footer={null}
        closable={alert?.closeable}
        visible={alert !== undefined}
        className="copilot-modal"
        onCancel={() => (alert?.closeable ? setAlert(undefined) : null)}>
        <div className="modal-content flex-centered column">
          <img
            src={`img/copilot/${alert?.status === 'neutral' ? 'copilot' : 'copilot_white'}.png`}
            className={alert?.status === 'neutral' ? '' : alert?.status}
            alt="Copilot Icon"
          />
          <div className="body flex align-start justify-center column">
            <h2 className={alert?.status === 'neutral' ? 'gradient-text' : alert?.status + '-text'}>
              {alert?.overview ?? dictionary.copilot.header}
            </h2>
            {alert?.detail}
            {alert?.solution}
            <Button
              disabled={alert?.action?.disabled}
              className={`small-btn ${alert?.status === 'failure' ? 'error-btn' : ''}`}
              onClick={() => {
                if (alert?.action) {
                  alert?.action.onClick();
                }
                setAlert(undefined);
              }}>
              {alert?.action?.text ?? dictionary.copilot.okay}
            </Button>
          </div>
        </div>
      </Modal>
      {/* Definition Modal */}
      <Modal
        footer={null}
        visible={definition !== undefined}
        className="copilot-modal"
        onCancel={() => setDefinition(undefined)}>
        <div className="modal-content flex-centered column">
          <img src={`img/copilot/copilot.png`} alt="Copilot Icon" />
          <div className="body flex align-start justify-center column">
            {collateralDetail && connected && <HealthBar fullDetail />}
            <h2 className="gradient-text">{definition?.term}</h2>
            <span>{definition?.definition}</span>
            <Button size="small" onClick={() => setDefinition(undefined)}>
              {dictionary.copilot.okay}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
