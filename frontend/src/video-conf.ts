import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  Participant,
  RemoteParticipant,
  RemoteTrack,
  RemoteTrackPublication,
  Room,
  RoomEvent,
  Track,
  VideoPresets,
  LocalTrackPublication,
  LocalParticipant, DisconnectReason,
} from 'livekit-client';

class VideoConf extends LitElement {

  constructor() {
    super();
  }

  @property()
  url: string;

  @property()
  token: string;

  render() {
    return html`
      <div id="content">
        <span>Video Conference</span>
        <div id="local"></div>
        <div id="remote"></div>
      </div>
    `;
  }

  async afterServerUpdate() {
    console.log("afterServerUpdate");

    // creates a new room with options
    const room = new Room({
      // automatically manage subscribed video quality
      adaptiveStream: true,

      // optimize publishing bandwidth and CPU for published tracks
      dynacast: true,

      // default capture settings
      videoCaptureDefaults: {
        resolution: VideoPresets.h720.resolution,
      },
    });

    // pre-warm connection, this can be called as early as your page is loaded
    room.prepareConnection(this.url, this.token);

    // set up event listeners
    room
      .on(RoomEvent.TrackSubscribed, this.handleTrackSubscribed)
      .on(RoomEvent.TrackUnsubscribed, this.handleTrackUnsubscribed)
      .on(RoomEvent.ActiveSpeakersChanged, this.handleActiveSpeakerChange)
      .on(RoomEvent.Disconnected, this.handleDisconnect)
      .on(RoomEvent.LocalTrackPublished, this.handleLocalTrackPublished)
      .on(RoomEvent.LocalTrackUnpublished, this.handleLocalTrackUnpublished);

    // connect to room
    await room.connect(this.url, this.token);
    console.log('connected to room:', room.name);

    // publish local camera and mic tracks
    await room.localParticipant.enableCameraAndMicrophone();
    //await room.localParticipant.setMicrophoneEnabled(true);
    console.log('camera enabled for:', room.name);
  }

  private handleTrackSubscribed = (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
    console.log('handleTrackSubscribed');
    if (track.kind === Track.Kind.Video || track.kind === Track.Kind.Audio) {
      // attach it to a new HTMLVideoElement or HTMLAudioElement
      const trackElement = track.attach();
      const divElement = this?.shadowRoot?.getElementById('remote');
      if (divElement != null && trackElement != null) {
        divElement.appendChild(trackElement);
      }
    }
  }

  private handleTrackUnsubscribed = (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
    // remove tracks from all attached elements
    console.log('handleTrackUnsubscribed');
    track.detach();
    const divElement = this?.shadowRoot?.getElementById('remote');
    while (divElement?.firstChild) {
        divElement?.removeChild(divElement.firstChild);
    }
  }

  private handleLocalTrackUnpublished = (publication: LocalTrackPublication, participant: LocalParticipant) => {
    console.log('handleLocalTrackUnpublished');
    publication?.track?.detach();
    const divElement = this?.shadowRoot?.getElementById('local');
    while (divElement?.firstChild) {
        divElement?.removeChild(divElement.firstChild);
    }
  }

  private handleLocalTrackPublished = (publication: LocalTrackPublication, participant: LocalParticipant) => {
    console.log('handleLocalTrackPublished');
      const trackElement = publication?.track?.attach();
      const divElement = this?.shadowRoot?.getElementById('local');
      if (divElement != null && trackElement != null) {
        divElement.appendChild(trackElement);
      }
  }

  private handleActiveSpeakerChange = (speakers: Participant[]) => {
    // show UI indicators when participant is speaking
    console.log('handleActiveSpeakerChange');
  }

  private handleDisconnect = (reason?: DisconnectReason) => {
    console.log('handleDisconnect');
    const remoteElement = this?.shadowRoot?.getElementById('remote');
    while (remoteElement?.firstChild) {
        remoteElement?.removeChild(remoteElement.firstChild);
    }

    const localElement = this?.shadowRoot?.getElementById('local');
    while (localElement?.firstChild) {
        localElement?.removeChild(localElement.firstChild);
    }
  }

}

customElements.define('video-conf', VideoConf);