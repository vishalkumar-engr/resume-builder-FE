import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100vh",
  },
  page: {
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  section1: {
    marginLeft: 20,
    marginRight: 20,
  },
  subSection: {
    marginRight: 10,
    paddingRight: 10,
  },
  header: {
    fontSize: 18,
    fontStyle: "bold",
    marginBottom: 5,
    marginTop: 10,
    borderBottom: "2px solid grey",
  },
  header1: {
    fontSize: 18,
    fontStyle: "bold",
    marginBottom: 5,
  },
  subHeader: {
    marginTop: 5,
    fontSize: 16,
  },
  subHeader1: {
    marginBottom: 5,
    fontSize: 16,
  },
  body: {
    fontSize: 12,
  },
  link: {
    color: "blue",
    textDecoration: "underline",
  },
  flex: {
    flexDirection: "row",
    width: "100%",
  },
  left: {
    width: "40%",
    borderRight: "2px solid grey",
    height: "95vh",
  },
  right: {
    width: "60%",
    paddingRight: 10,
  },
  center: {
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
});
