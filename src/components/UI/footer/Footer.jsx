import React from 'react'
import './footer.css'
import fb from '../../../assets/Icons/fb.svg'
import twitter from '../../../assets/Icons/twitter.svg'
import youtube from '../../../assets/Icons/youtube.svg'

const Footer = () => {
  return (
    <div className="footer">
      <div className="container_footer">
        <div className="footer__name"> © 2022 STONKS </div>
        <div className="footer__privacy">Политика конфиденциальности</div>
        <div className="footer__socnet">
          <a href="https://t.me/nerpyshkaa" target="_blank" className="youtube">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="21" viewBox="0 0 25 21" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.71862 8.89063C8.42949 5.97613 12.9045 4.05471 15.1435 3.12638C21.5365 0.4758 22.8649 0.0153659 23.7307 0.000162107C23.9212 -0.0031818 24.347 0.0438625 24.6228 0.26695C24.8557 0.455321 24.9197 0.709783 24.9504 0.88838C24.9811 1.06698 25.0192 1.47382 24.9889 1.79172C24.6424 5.42016 23.1434 14.2254 22.3808 18.2893C22.0581 20.0089 21.4227 20.5855 20.8076 20.6419C19.4707 20.7646 18.4556 19.7613 17.1608 18.9152C15.1348 17.5914 13.9901 16.7672 12.0235 15.4754C9.75066 13.9824 11.224 13.1618 12.5193 11.8208C12.8583 11.4698 18.7484 6.1294 18.8624 5.64494C18.8767 5.58435 18.8899 5.3585 18.7553 5.23925C18.6207 5.11999 18.422 5.16077 18.2787 5.1932C18.0754 5.23918 14.8388 7.37169 8.56858 11.5907C7.64986 12.2196 6.8177 12.526 6.07212 12.5099C5.25018 12.4922 3.6691 12.0467 2.49372 11.6658C1.05207 11.1987 -0.0937162 10.9517 0.00605648 10.1584C0.0580243 9.74519 0.628878 9.3226 1.71862 8.89063Z"
                fill="white"
              />
            </svg>
          </a>
          <a href="https://t.me/Awhmsk" target="_blank" className="youtube">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="21" viewBox="0 0 25 21" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.71862 8.89063C8.42949 5.97613 12.9045 4.05471 15.1435 3.12638C21.5365 0.4758 22.8649 0.0153659 23.7307 0.000162107C23.9212 -0.0031818 24.347 0.0438625 24.6228 0.26695C24.8557 0.455321 24.9197 0.709783 24.9504 0.88838C24.9811 1.06698 25.0192 1.47382 24.9889 1.79172C24.6424 5.42016 23.1434 14.2254 22.3808 18.2893C22.0581 20.0089 21.4227 20.5855 20.8076 20.6419C19.4707 20.7646 18.4556 19.7613 17.1608 18.9152C15.1348 17.5914 13.9901 16.7672 12.0235 15.4754C9.75066 13.9824 11.224 13.1618 12.5193 11.8208C12.8583 11.4698 18.7484 6.1294 18.8624 5.64494C18.8767 5.58435 18.8899 5.3585 18.7553 5.23925C18.6207 5.11999 18.422 5.16077 18.2787 5.1932C18.0754 5.23918 14.8388 7.37169 8.56858 11.5907C7.64986 12.2196 6.8177 12.526 6.07212 12.5099C5.25018 12.4922 3.6691 12.0467 2.49372 11.6658C1.05207 11.1987 -0.0937162 10.9517 0.00605648 10.1584C0.0580243 9.74519 0.628878 9.3226 1.71862 8.89063Z"
                fill="white"
              />
            </svg>
          </a>

          <a href="https://github.com/awqsomee/4D-Stock-Exchange" target="_blank" className="youtube">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <g clipPath="url(#clip0_1530_1478)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.4628 0C5.57117 0 0 5.61224 0 12.5554C0 18.1054 3.56964 22.8033 8.52168 24.4661C9.14082 24.5911 9.3676 24.1959 9.3676 23.8635C9.3676 23.5724 9.34719 22.5747 9.34719 21.5352C5.88036 22.2837 5.15842 20.0385 5.15842 20.0385C4.60128 18.5834 3.77577 18.2094 3.77577 18.2094C2.64107 17.4403 3.85842 17.4403 3.85842 17.4403C5.11709 17.5235 5.77755 18.7291 5.77755 18.7291C6.89158 20.6413 8.68673 20.101 9.40893 19.7684C9.51199 18.9577 9.84235 18.3964 10.1931 18.0847C7.42806 17.7936 4.51888 16.7128 4.51888 11.8901C4.51888 10.5181 5.01378 9.39566 5.79796 8.5227C5.67423 8.21097 5.24082 6.92194 5.92194 5.19668C5.92194 5.19668 6.97423 4.86403 9.34694 6.48546C10.3628 6.21063 11.4104 6.07082 12.4628 6.06964C13.5151 6.06964 14.5878 6.21531 15.5783 6.48546C17.9513 4.86403 19.0036 5.19668 19.0036 5.19668C19.6847 6.92194 19.251 8.21097 19.1273 8.5227C19.9321 9.39566 20.4066 10.5181 20.4066 11.8901C20.4066 16.7128 17.4974 17.7727 14.7117 18.0847C15.1658 18.4796 15.5577 19.2278 15.5577 20.4128C15.5577 22.0964 15.5372 23.4477 15.5372 23.8633C15.5372 24.1959 15.7643 24.5911 16.3832 24.4663C21.3352 22.8031 24.9048 18.1054 24.9048 12.5554C24.9253 5.61224 19.3337 0 12.4628 0Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1530_1478">
                  <rect width="25" height="24.4898" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a href="https://github.com/awqsomee/StockExchangeServer" target="_blank" className="youtube">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <g clipPath="url(#clip0_1530_1478)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.4628 0C5.57117 0 0 5.61224 0 12.5554C0 18.1054 3.56964 22.8033 8.52168 24.4661C9.14082 24.5911 9.3676 24.1959 9.3676 23.8635C9.3676 23.5724 9.34719 22.5747 9.34719 21.5352C5.88036 22.2837 5.15842 20.0385 5.15842 20.0385C4.60128 18.5834 3.77577 18.2094 3.77577 18.2094C2.64107 17.4403 3.85842 17.4403 3.85842 17.4403C5.11709 17.5235 5.77755 18.7291 5.77755 18.7291C6.89158 20.6413 8.68673 20.101 9.40893 19.7684C9.51199 18.9577 9.84235 18.3964 10.1931 18.0847C7.42806 17.7936 4.51888 16.7128 4.51888 11.8901C4.51888 10.5181 5.01378 9.39566 5.79796 8.5227C5.67423 8.21097 5.24082 6.92194 5.92194 5.19668C5.92194 5.19668 6.97423 4.86403 9.34694 6.48546C10.3628 6.21063 11.4104 6.07082 12.4628 6.06964C13.5151 6.06964 14.5878 6.21531 15.5783 6.48546C17.9513 4.86403 19.0036 5.19668 19.0036 5.19668C19.6847 6.92194 19.251 8.21097 19.1273 8.5227C19.9321 9.39566 20.4066 10.5181 20.4066 11.8901C20.4066 16.7128 17.4974 17.7727 14.7117 18.0847C15.1658 18.4796 15.5577 19.2278 15.5577 20.4128C15.5577 22.0964 15.5372 23.4477 15.5372 23.8633C15.5372 24.1959 15.7643 24.5911 16.3832 24.4663C21.3352 22.8031 24.9048 18.1054 24.9048 12.5554C24.9253 5.61224 19.3337 0 12.4628 0Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_1530_1478">
                  <rect width="25" height="24.4898" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
