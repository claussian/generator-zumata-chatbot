// @ts-check

export declare interface FacebookPostbackEventPostback {
  title: string;
  payload: string;
}
export declare interface FacebookPostbackEvent extends FacebookEvent {
  postback: FacebookPostbackEventPostback;
}

/** Import typings */
import { FacebookEvent } from './handle-receive-message';

/** Import other modules */
import processIntent from '../dialogflow/process-intent';
import sendReadReceipt from './send-read-receipt';

export async function handleReceivePostback(
  event: FacebookPostbackEvent
) {
  try {
    const {
      sender,
      postback,
    } = event || {} as FacebookPostbackEvent;
    const {
      payload,
    } = postback || {} as FacebookPostbackEventPostback;

    /**
     * It's good practice to send the user a read receipt so they know
     * the bot has seen the message. This can prevent a user from
     * spamming the bot if the requests take some time to return.
     */
    await sendReadReceipt(sender);

    return await processIntent(sender, payload);
  } catch (e) {
    throw e;
  }
}

export default handleReceivePostback;
