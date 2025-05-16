import { SPACES } from "@config/themes/themes";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Button, Card, Dialog, Portal, Text } from "react-native-paper";

interface Props {
  actionButton: () => void;
  error: string;
}

const NoAccessToContacts = ({ actionButton, error }: Props) => {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Portal>
        <Dialog visible={openDialog} onDismiss={() => setOpenDialog(false)}>
          <Dialog.Title style={{ textAlign: "center" }}>
            {t("contacts.text-no-access-title-avise")}
          </Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{ textAlign: "center" }}>
              {t("contacts.text-no-access-avise")}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setOpenDialog(false)}>{t("common.label-cancel")}</Button>
            <Button
              mode="contained"
              onPress={() => {
                actionButton();
                setOpenDialog(false);
              }}
            >
              {t("common.label-accept")}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="bodyMedium" style={styles.text}>
            {error ? error : t("contacts.text-no-access")}
          </Text>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button onPress={() => setOpenDialog(true)}>
            {error ? t("label-try-again") : t("contacts.allow-access")}
          </Button>
        </Card.Actions>
      </Card>
    </>
  );
};

export default NoAccessToContacts;

const styles = StyleSheet.create({
  card: {
    margin: SPACES.m2,
  },
  text: {
    textAlign: "center",
  },
  actions: {
    marginVertical: SPACES.m1,
    alignSelf: "center",
  },
});
