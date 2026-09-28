import React from 'react';
import { KidCareVectorLogo, KidCareMainLogo, KidCareEmblemLogo } from './AndroidIcons';

export const Logo = ({ size = "medium", light = false, showTagline = false }) => {
  if (size === "small") {
    return <KidCareVectorLogo width={120} height={21} />;
  }
  if (size === "large") {
    return <KidCareVectorLogo width={180} height={31} />;
  }
  return <KidCareVectorLogo width={144} height={25} />;
};
