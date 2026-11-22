import { styled } from '@linaria/react'
import { CallsStyled } from 'app/Custom/components/Calls/styles'
import {
  CustomLayoutStyled,
  CustomLayoutMainStyled,
} from 'app/Custom/Layout/styles'
import { FooterStyled } from 'app/Custom/Layout/Footer/styles'
import { ChatWidgetContainer } from 'app/Custom/components/Chat/ChatWidget/styles'

export const CallRoomStyled = styled(CallsStyled)`
  .call-page-title {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
  body:has(&[data-active='true']) ${CustomLayoutStyled} {
    height: 100dvh;
    min-height: 0;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
  }
  body:has(&[data-active='true']) ${CustomLayoutMainStyled} {
    min-height: 0;
    display: grid;
    grid-template-rows: minmax(0, 1fr);
    padding: 0;
    margin: 0;
    max-width: unset;
  }
  body:has(&[data-active='true'])
    ${FooterStyled},
    body:has(&[data-active='true'])
    ${ChatWidgetContainer} {
    display: none;
  }
  &[data-active='true'] {
    max-width: none;
    min-height: 0;
    height: 100%;
    padding: 0;
    margin: 0;
  }
`
