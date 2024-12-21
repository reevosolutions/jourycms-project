"use client";
import React from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon
} from "react-share";

const DEFAULT_IMAGE = "/assets/miqat/images/praying_man.webp";

const ShareControl: React.FC<{
  path: string;
  title: string;
  showCount?: boolean;
}> = ({path, title, showCount = false}) => {
  const url = `${String(window.location)}${path}`;

  return (
    <div className="Demo__container flex justify-center gap-4 items-center§§">
      <div className="Demo__some-network">
        <FacebookShareButton
          url={url}
          className="Demo__some-network__share-button"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        {showCount && (
          <div>
            <FacebookShareCount
              url={url}
              className="Demo__some-network__share-count"
            >
              {count => count}
            </FacebookShareCount>
          </div>
        )}
      </div>

      <div className="Demo__some-network">
        <FacebookMessengerShareButton
          url={url}
          appId="521270401588372"
          className="Demo__some-network__share-button"
        >
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
      </div>

      <div className="Demo__some-network">
        <TwitterShareButton
          url={url}
          title={title}
          className="Demo__some-network__share-button"
        >
          <XIcon size={32} round />
        </TwitterShareButton>
      </div>

      <div className="Demo__some-network">
        <TelegramShareButton
          url={url}
          title={title}
          className="Demo__some-network__share-button"
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      </div>

      <div className="Demo__some-network">
        <WhatsappShareButton
          url={url}
          title={title}
          separator=":: "
          className="Demo__some-network__share-button"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>

      <div className="Demo__some-network">
        <LinkedinShareButton
          url={url}
          className="Demo__some-network__share-button"
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>

      {/* <div className="Demo__some-network">
        <PinterestShareButton
          url={String(window.location)}
          media={`${String(window.location)}${DEFAULT_IMAGE}`}
          className="Demo__some-network__share-button"
        >
          <PinterestIcon size={32} round />
        </PinterestShareButton>
        {showCount && (
          <div>
            <PinterestShareCount
              url={url}
              className="Demo__some-network__share-count"
            />
          </div>
        )}
      </div>

      <div className="Demo__some-network">
        <VKShareButton
          url={url}
          image={`${String(window.location)}${DEFAULT_IMAGE}`}
          className="Demo__some-network__share-button"
        >
          <VKIcon size={32} round />
        </VKShareButton>

        {showCount && (
          <div>
            <VKShareCount
              url={url}
              className="Demo__some-network__share-count"
            />
          </div>
        )}
      </div>

      <div className="Demo__some-network">
        <OKShareButton
          url={url}
          image={`${String(window.location)}${DEFAULT_IMAGE}`}
          className="Demo__some-network__share-button"
        >
          <OKIcon size={32} round />
        </OKShareButton>

        {showCount && (
          <div>
            <OKShareCount
              url={url}
              className="Demo__some-network__share-count"
            />
          </div>
        )}
      </div>

      <div className="Demo__some-network">
        <RedditShareButton
          url={url}
          title={title}
          windowWidth={660}
          windowHeight={460}
          className="Demo__some-network__share-button"
        >
          <RedditIcon size={32} round />
        </RedditShareButton>

        {showCount && (
          <div>
            <RedditShareCount
              url={url}
              className="Demo__some-network__share-count"
            />
          </div>
        )}
      </div>

      <div className="Demo__some-network">
        <GabShareButton
          url={url}
          title={title}
          windowWidth={660}
          windowHeight={640}
          className="Demo__some-network__share-button"
        >
          <GabIcon size={32} round />
        </GabShareButton>
      </div>

      <div className="Demo__some-network">
        <TumblrShareButton
          url={url}
          title={title}
          className="Demo__some-network__share-button"
        >
          <TumblrIcon size={32} round />
        </TumblrShareButton>

        {showCount && (
          <div>
            <TumblrShareCount
              url={url}
              className="Demo__some-network__share-count"
            />
          </div>
        )}
      </div>

      <div className="Demo__some-network">
        <LivejournalShareButton
          url={url}
          title={title}
          description={url}
          className="Demo__some-network__share-button"
        >
          <LivejournalIcon size={32} round />
        </LivejournalShareButton>
      </div>

      <div className="Demo__some-network">
        <MailruShareButton
          url={url}
          title={title}
          className="Demo__some-network__share-button"
        >
          <MailruIcon size={32} round />
        </MailruShareButton>
      </div> */}

      <div className="Demo__some-network">
        <EmailShareButton
          url={url}
          subject={title}
          body="body"
          className="Demo__some-network__share-button"
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>

      <div className="Demo__some-network">
        <ViberShareButton
          url={url}
          title={title}
          className="Demo__some-network__share-button"
        >
          <ViberIcon size={32} round />
        </ViberShareButton>
      </div>

      {/* <div className="Demo__some-network">
        <WorkplaceShareButton
          url={url}
          quote={title}
          className="Demo__some-network__share-button"
        >
          <WorkplaceIcon size={32} round />
        </WorkplaceShareButton>
      </div>

      <div className="Demo__some-network">
        <LineShareButton
          url={url}
          title={title}
          className="Demo__some-network__share-button"
        >
          <LineIcon size={32} round />
        </LineShareButton>
      </div>

      <div className="Demo__some-network">
        <WeiboShareButton
          url={url}
          title={title}
          image={`${String(window.location)}${DEFAULT_IMAGE}`}
          className="Demo__some-network__share-button"
        >
          <WeiboIcon size={32} round />
        </WeiboShareButton>
      </div>

      <div className="Demo__some-network">
        <PocketShareButton
          url={url}
          title={title}
          className="Demo__some-network__share-button"
        >
          <PocketIcon size={32} round />
        </PocketShareButton>
      </div>

      <div className="Demo__some-network">
        <InstapaperShareButton
          url={url}
          title={title}
          className="Demo__some-network__share-button"
        >
          <InstapaperIcon size={32} round />
        </InstapaperShareButton>
      </div>

      <div className="Demo__some-network">
        <HatenaShareButton
          url={url}
          title={title}
          windowWidth={660}
          windowHeight={460}
          className="Demo__some-network__share-button"
        >
          <HatenaIcon size={32} round />
        </HatenaShareButton>

        {showCount && (
          <div>
            <HatenaShareCount
              url={url}
              className="Demo__some-network__share-count"
            />
          </div>
        )}
      </div> */}
    </div>
  );
};

export default ShareControl;
