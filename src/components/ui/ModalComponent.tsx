import { SPACES } from "@config/themes/themes";
import { type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Modal, Portal, Text } from "react-native-paper";

interface Props {
  visible: boolean;
  hideModal: () => void;
  children: ReactNode;
  title?: string;
}

const ModalComponent = ({ visible, hideModal, children, title }: Props) => {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
        <View>
          {title && (
            <View style={styles.viewTitle}>
              <Text variant="titleLarge" style={styles.title}>
                {title}
              </Text>
              <Divider />
            </View>
          )}
          <View style={styles.content}>{children}</View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  viewTitle: {
    flexDirection: "column",
  },
  title: {
    padding: SPACES.p2,
    color: "black",
  },
  modal: {
    backgroundColor: "white",
    margin: SPACES.m2,
  },
  content: {
    padding: SPACES.p2,
  },
});

export default ModalComponent;
