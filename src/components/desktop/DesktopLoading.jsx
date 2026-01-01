import '@components/desktop/DesktopLoading.css';
import { xp_loading_logo, xp_loading_mslogo } from '@assets';

const DesktopLoading = () => {
  return (
    <div className="xp-loading">
      <div className="xp-loading__logo-container">
        <div className="xp-loading__logo">
            <img src={xp_loading_logo} alt="Windows XP Loading Logo" width={"350px"}/>
        </div>
      </div>

      <div className="xp-loading__progress-container">
        <div className="xp-loading__progress-track">
          <div className="xp-loading__progress-blocks">
            <div className="xp-loading__progress-block" />
            <div className="xp-loading__progress-block" />
            <div className="xp-loading__progress-block" />
          </div>
        </div>
      </div>

      <div className="xp-loading__copyright">
        <div className="xp-loading__copyright-text xp-loading__copyright-text--start">
            <p>Copyright © Microsoft Corporation</p>
        </div>
        <div className="xp-loading__copyright-text xp-loading__copyright-text--end">
            <img src={xp_loading_mslogo} alt="Microsoft Logo" width={"125px"}/>
        </div>
      </div>
    </div>
  );
};

export default DesktopLoading;
