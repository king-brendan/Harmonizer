import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Audio } from "expo-av";

const App = () => {
  const [sound, setSound] = React.useState<Audio.Sound | undefined>();
  const [backingTrack, setBacking] = React.useState<Audio.Sound | undefined>();
  const [backingPlaying, setBackingPlaying] = React.useState(false);
  const [currentChord, changeCurrentChord] = React.useState("none");

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

  /*
  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  */

  const cMajor = () => playSounds("C.mp3", "E.mp3", "G.mp3", "highC.mp3");
  const dMinor = () => playSounds("D.mp3", "F.mp3", "A.mp3", "highC.mp3");
  const eMinor = () => playSounds("E.mp3", "G.mp3", "B.mp3", "highE.mp3");
  const fMajorInv = () => playSounds("C.mp3", "F.mp3", "A.mp3", "highC.mp3");
  const fMajor = () => playSounds("F.mp3", "A.mp3", "C.mp3", "highF.mp3");
  const fMajorSeven = () => playSounds("F.mp3", "A.mp3", "C.mp3", "highE.mp3");
  const gMajor = () => playSounds("G.mp3", "B.mp3", "highD.mp3", "highG.mp3");
  const aMinor = () =>
    playSounds("A.mp3", "highC.mp3", "highE.mp3", "highA.mp3");

  return (
    <View style={styles.container}>
      <View style={styles.drumsBox}>
        <Button
          onPress={() => {
            setBackingPlaying(true);
            playBacking("drums.mp3");
          }}
          title="Play Drums"
        />
        <Button
          onPress={async () => {
            setBackingPlaying(false);
            await backingTrack?.stopAsync();
          }}
          title="Stop Drums"
        />
      </View>
      <View style={styles.buttonsBox}>
        <Button onPress={cMajor} title="Home" />
        <Button onPress={dMinor} title="Wistful" />
        <Button onPress={eMinor} title="Heartache" />
        <Button onPress={fMajorInv} title="Next Door" />
        <Button onPress={fMajor} title="Away" />
        <Button onPress={fMajorSeven} title="Homesick" />
        <Button onPress={gMajor} title="Jubilant" />
        <Button onPress={aMinor} title="In Despair" />
      </View>
    </View>
  );

  /*
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          setBackingPlaying(true);
          playBacking("drums.mp3");
        }}
        title="Play Drums"
      />
      <Button
        onPress={async () => {
          setBackingPlaying(false);
          await backingTrack?.stopAsync();
        }}
        title="Stop Drums"
      />
      <Button onPress={cMajor} title="C major" />
      <Button
        onPress={() => playSounds("D.mp3", "F.mp3", "A.mp3", "highC.mp3")}
        title="D minor 7"
      />
      <Button
        onPress={() => playSounds("D.mp3", "F.mp3", "A.mp3", "highD.mp3")}
        title="D minor"
      />
      <Button
        onPress={() => playSounds("D.mp3", "F.mp3", "G#.mp3", "highC.mp3")}
        title="D minor 7 flat 5"
      />
      <Button
        onPress={() => playSounds("E.mp3", "G.mp3", "B.mp3", "highE.mp3")}
        title="E minor"
      />
      <Button
        onPress={() => playSounds("E.mp3", "G.mp3", "B.mp3", "highD.mp3")}
        title="E minor 7"
      />
      <Button
        onPress={() => playSounds("E.mp3", "G#.mp3", "B.mp3", "D.mp3")}
        title="E 7"
      />
      <Button
        onPress={() => playSounds("C.mp3", "F.mp3", "A.mp3", "highC.mp3")}
        title="F major 3rd inversion"
      />
      <Button
        onPress={() => playSounds("F.mp3", "A.mp3", "C.mp3", "highF.mp3")}
        title="F major"
      />
      <Button
        onPress={() => playSounds("F.mp3", "A.mp3", "C.mp3", "highE.mp3")}
        title="F major 7"
      />
      <Button
        onPress={() => playSounds("G.mp3", "B.mp3", "highD.mp3", "highG.mp3")}
        title="G major"
      />
      <Button
        onPress={() => playSounds("D.mp3", "F.mp3", "G.mp3", "B.mp3")}
        title="G 7"
      />
      <Button
        onPress={() => playSounds("E.mp3", "A.mp3", "C.mp3", "highC")}
        title="A minor"
      />
    </View>
  );
  */
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  drumsBox: {
    flex: 1,
  },
  buttonsBox: {
    flex: 2,
  },
});

export default App;
