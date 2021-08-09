import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Audio } from "expo-av";

const App = () => {
  const [sound, setSound] = React.useState<Audio.Sound | undefined>();
  const [backingTrack, setBacking] = React.useState<Audio.Sound | undefined>();
  const [backingPlaying, setBackingPlaying] = React.useState(false);

  async function playSound(file: string) {
    if (file === "none") {
      return;
    }

    const { sound } = await Audio.Sound.createAsync(
      require("./assets/sounds/" + file)
    );
    setSound(sound);

    await sound.playAsync();
  }

  async function playBacking(file: string) {
    if (backingPlaying) {
      return;
    }

    const { sound } = await Audio.Sound.createAsync(
      require("./assets/sounds/" + file)
    );
    setBacking(sound);

    await sound.playAsync();
  }

  async function playSounds(
    file1: string,
    file2: string,
    file3: string,
    file4: string
  ) {
    await Promise.allSettled([
      playSound(file1),
      playSound(file2),
      playSound(file3),
      playSound(file4),
    ]);
  }

  // Build chords here
  const cMajor = () => playSounds("C.mp3", "E.mp3", "G.mp3", "highC.mp3");
  const dMinor = () => playSounds("D.mp3", "F.mp3", "A.mp3", "highC.mp3");
  const eMinor = () => playSounds("E.mp3", "G.mp3", "B.mp3", "highE.mp3");
  const fMajorInv = () => playSounds("C.mp3", "F.mp3", "A.mp3", "highC.mp3");
  const fMajor = () => playSounds("F.mp3", "A.mp3", "C.mp3", "highF.mp3");
  const fMajorSeven = () => playSounds("F.mp3", "A.mp3", "C.mp3", "highE.mp3");
  const gMajor = () => playSounds("G.mp3", "B.mp3", "highD.mp3", "highG.mp3");
  const aMinor = () =>
    playSounds("A.mp3", "highC.mp3", "highE.mp3", "highA.mp3");

  const chords = [
    cMajor,
    dMinor,
    eMinor,
    fMajorInv,
    fMajor,
    fMajorSeven,
    gMajor,
    aMinor,
  ];

  const randomChord = () => {
    chords[Math.floor(Math.random() * chords.length)]();
  };

  return (
    <View style={styles.container}>
      <h1>Harmonizer</h1>
      <View style={styles.drumsBox}>
        <Button
          color="#7F00FF"
          onPress={() => {
            setBackingPlaying(true);
            playBacking("drums.mp3");
          }}
          title="Play Drums"
        />
        <Button
          color="#7F00FF"
          onPress={async () => {
            setBackingPlaying(false);
            await backingTrack?.stopAsync();
          }}
          title="Stop Drums"
        />
      </View>
      <View style={styles.buttonsBox}>
        <Button color="#07c700" onPress={cMajor} title="Home" />
        <Button onPress={dMinor} title="Wistful" />
        <Button onPress={eMinor} title="Heartache" />
        <Button onPress={fMajorInv} title="Next Door" />
        <Button onPress={fMajor} title="Away" />
        <Button onPress={fMajorSeven} title="Homesick" />
        <Button onPress={gMajor} title="Jubilant" />
        <Button onPress={aMinor} title="In Despair" />
      </View>
      <View style={styles.otherButtonsBox}>
        <Button color="#f44336" onPress={randomChord} title="Suprise Me" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe8f7",
    alignItems: "center",
    justifyContent: "center",
  },
  drumsBox: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  buttonsBox: {
    flex: 2,
    justifyContent: "space-evenly",
  },
  otherButtonsBox: {
    flex: 1,
  },
});

export default App;
