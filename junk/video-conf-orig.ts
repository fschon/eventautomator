import { html, LitElement } from 'lit';
import '@vaadin/button';
import '@vaadin/text-field';
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
  LocalParticipant,
} from 'livekit-client';

class VideoConf extends LitElement {

  render() {
    return html`
      <div id="content">
        <span>Video Conference</span>
      </div>
    `;
  }

  // Must be an async function for await ot be allowed.
  // See: https://docs.livekit.io/client-sdk-js/
  async afterServerUpdate() {
    var thisElement = this;
    var url = "wss://event-automator-332245jc.livekit.cloud";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTExMDMzOTgsImlzcyI6IkFQSU1UNzV1R0NaeW1vMiIsIm5iZiI6MTcxMTA5NjE5OCwic3ViIjoicXVpY2tzdGFydCB1c2VyIGFnOWFwcSIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJxdWlja3N0YXJ0IHJvb20iLCJyb29tSm9pbiI6dHJ1ZX19.QH09EJuDCLiF1lAtW3lzD68y7GBreTPYcRJzgTzSBH8"

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
    room.prepareConnection(url, token);

    // set up event listeners
    room
      .on(RoomEvent.TrackSubscribed, thisElement.handleTrackSubscribed)
      .on(RoomEvent.TrackUnsubscribed, thisElement.handleTrackUnsubscribed)
      .on(RoomEvent.ActiveSpeakersChanged, thisElement.handleActiveSpeakerChange)
      .on(RoomEvent.Disconnected, thisElement.handleDisconnect)
      .on(RoomEvent.LocalTrackPublished, thisElement.handleLocalTrackPublished)
      .on(RoomEvent.LocalTrackUnpublished, thisElement.handleLocalTrackUnpublished);

    // connect to room
    await room.connect(url, token);
    console.log('connected to room:', room.name);

    // publish local camera and mic tracks
    await room.localParticipant.enableCameraAndMicrophone();
    console.log('camera enabled for:', room.name);

    //await room.localParticipant.setScreenShareEnabled(true);
    //console.log('share screen to:', room.name);
  }

  handleTrackSubscribed(
    track: RemoteTrack,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant,
  ) {
    var thisElement = this;

    console.log('handleTrackSubscribed');
    if (track.kind === Track.Kind.Video || track.kind === Track.Kind.Audio) {
      // attach it to a new HTMLVideoElement or HTMLAudioElement
      const element = track.attach();
      thisElement.appendChild(element);
    }
  }

  handleTrackUnsubscribed(
    track: RemoteTrack,
    publication: RemoteTrackPublication,
    participant: RemoteParticipant,
  ) {
    // remove tracks from all attached elements
    console.log('handleTrackUnsubscribed');
    track.detach();
  }

  handleLocalTrackUnpublished(
    publication: LocalTrackPublication,
    participant: LocalParticipant,
  ) {
    console.log('handleLocalTrackUnpublished');
  }

  handleLocalTrackPublished(
    publication: LocalTrackPublication,
    participant: LocalParticipant,
  ) {
    var thisElement = this;
    console.log('handleLocalTrackPublished');
    if (publication != null && publication.track != null) {
      console.log('handleLocalTrackPublished 1');
      const trackElement = publication.track.attach();
      if (thisElement != null) {
        console.log('handleLocalTrackPublished 1.5');
        if (thisElement.shadowRoot != null) {
            console.log('handleLocalTrackPublished 2');
            const divElement = thisElement.shadowRoot.getElementById('content');
            if (divElement != null) {
              console.log('handleLocalTrackPublished 3');
              divElement.appendChild(trackElement);
            }
        }
      }
    }
  }

  handleActiveSpeakerChange(speakers: Participant[]) {
    // show UI indicators when participant is speaking
    console.log('handleActiveSpeakerChange');
  }

  handleDisconnect() {
    console.log('handleDisconnect');
  }

}

customElements.define('video-conf', VideoConf);