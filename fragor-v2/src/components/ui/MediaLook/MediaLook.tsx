// libs
import React, { ReactNode } from 'react';
import styled from 'styled-components';

// utils
import mediaBreakpoints from 'utils/media-breakpoints';

interface MediaLookProps {
  children: ReactNode;
}

const MediaLookStyle = styled.div`
  text-align: center;

  .App-wrapper {
    text-align: center;

    background: linear-gradient(
        60deg,
        rgb(238, 238, 238) 30%,
        rgb(210, 210, 210) 50%,
        rgb(238, 238, 238) 70%
      )
      no-repeat fixed;
    opacity: 0.99;
  }

  .App-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;

    min-height: 70vh;
  }

  @media (min-width: ${mediaBreakpoints.desctop}) {
    min-height: 80vh;
    width: 90vw;

    background: linear-gradient(
        60deg,
        rgba(9, 50, 73, 1) 0%,
        rgba(37, 12, 40, 1) 40%,
        rgba(50, 6, 9, 1) 80%
      )
      no-repeat fixed;
    padding: 5vh 5vw;
    margin: auto;

    .App-wrapper {
      height: 90vh;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      margin: auto;
      border-radius: 3rem;
    }
  }
`;

const MediaLook: React.FC<MediaLookProps> = ({ children }) => {
  return <MediaLookStyle>{children}</MediaLookStyle>;
};

export default MediaLook;
