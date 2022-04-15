import React from "react";
import "./footer.css";
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
                    <a href="i.pinimg.com/originals/ab/05/24/ab05243553e3a1b19d49cb118aedac30.png" target="_blank">
                    <img src={fb} alt="fb_img" className="fb_img"></img>
                    </a>
                    <a href="sayingimages.com/wp-content/uploads/you-have-kitten-memes.jpg" target="_blank">
                    <img src={twitter} alt="twitter_img" className="twitter_img"></img>
                    </a>
                    <a href="starecat.com/content/wp-content/uploads/cat-kitty-kitten-fully-charged.jpg" target="_blank">
                    <img src={youtube} alt="youtube_img" className="youtube_img"></img>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;