import React, { useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { Page, Text, View, Document, Link } from "@react-pdf/renderer";
import { styles } from "./TemplateSheet";

const Template2 = ({ userData }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    if (userData) {
      setState(userData);
    }
  }, [userData]);

  return (
    <>
      {state && (
        <PDFViewer style={styles.container}>
          <Document
            viewerProps={{
              hideDownloadOption: true,
              hidePrintOption: true,
            }}
          >
            <Page size="A4" style={styles.page}>
              {/* Basic Details */}
              {state?.basic?.first && (
                <View style={styles?.section}>
                  <View>
                    <Text
                      style={[styles.header1, styles?.center]}
                    >{`${state?.basic?.first} ${state?.basic?.last}`}</Text>
                    <Text
                      style={[styles.subHeader1, styles?.center]}
                    >{`${state?.basic?.profession}`}</Text>
                    <View>
                      <Text
                        style={[styles.body, styles?.center]}
                      >{`Mail: ${state?.basic?.email}  Ph:${state?.basic?.phone}  Add:${state?.basic?.city}, ${state?.basic?.state}(${state?.basic?.pinCode})`}</Text>
                    </View>
                  </View>
                  {/* Social Details */}
                  <View
                    style={[
                      styles?.flex,
                      {
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      },
                    ]}
                  >
                    {state?.social?.map((ele, idx) => {
                      return (
                        <Text key={ele?.title} style={{ marginLeft: 10 }}>
                          <Link
                            style={[styles.link, styles.body]}
                            src={ele?.url}
                          >
                            {ele?.title}
                          </Link>
                        </Text>
                      );
                    })}
                  </View>
                </View>
              )}
              {/* Summary */}
              <View style={styles?.section1}>
                <Text style={styles.header}>Summary</Text>
                <Text style={styles.body}>{state?.basic?.about}</Text>
              </View>
              {/* Technical Skills */}
              <View style={styles?.section1}>
                <Text style={styles.header}>Technical Skills</Text>
                <View style={styles?.flex}>
                  {state?.technicalSkills?.map((item) => {
                    return (
                      <View key={item} style={{ marginRight: 10 }}>
                        <Text style={styles.body}>{item.key}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
              {/* Personal Skills */}
              <View style={styles?.section1}>
                <Text style={styles.header}>Personal Skills</Text>
                <View style={styles?.flex}>
                  {state?.personalSkills?.map((item) => {
                    return (
                      <View key={item} style={{ marginRight: 10 }}>
                        <Text style={styles.body}>{item.key}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
              {/* Experience */}
              <View style={styles?.section1}>
                <Text style={styles.header}>Experience</Text>
                {state?.experience?.map((item) => {
                  return (
                    <View key={item?.orgName}>
                      <Text style={styles.subHeader}>{item?.orgName}</Text>
                      <View style={styles.flex}>
                        <View>
                          <Text style={styles.body}>{item?.designation}</Text>
                        </View>
                        <View>
                          <Text style={styles.body}>, {item?.location}</Text>
                        </View>
                      </View>
                      <View style={styles.flex}>
                        <View>
                          <Text style={styles.body}>{item?.startDate}</Text>
                        </View>
                        <View>
                          <Text style={styles.body}> - {item?.endDate}</Text>
                        </View>
                      </View>
                      <View style={styles.flex}>
                        {item?.skills?.map((ele, index) => {
                          return (
                            <View>
                              <Text style={styles.body} key={ele}>
                                {index === 0 ? ele : `, ${ele}`}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  );
                })}
              </View>
              {/* Project */}
              <View style={styles?.section1}>
                <Text style={styles.header}>Project</Text>
                {state?.project?.map((item) => {
                  return (
                    <View key={item?.title}>
                      <Text style={styles.subHeader}>{item?.title}</Text>
                      <View style={styles.flex}>
                        <View>
                          <Text style={styles.body}>{item?.startDate}</Text>
                        </View>
                        <View>
                          <Text style={styles.body}> - {item?.endDate}</Text>
                        </View>
                        <View>
                          <Text style={styles.body}>
                            , Team Size - {item?.teamSize}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.flex}>
                        {item?.skills?.map((ele, index) => {
                          return (
                            <View>
                              <Text
                                style={[styles.body, styles?.boldText]}
                                key={ele}
                              >
                                {index === 0 ? ele : `, ${ele}`}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                      <Text style={[styles.body, { marginTop: 5 }]}>
                        {item?.description}
                      </Text>
                    </View>
                  );
                })}
              </View>
              {/* Education */}
              <View style={styles?.section1}>
                <Text style={styles.header}>Education</Text>
                {state?.education?.map((item) => {
                  return (
                    <View key={item?.degree} style={styles?.flex}>
                      <Text style={styles.subHeader1}>{item?.degree}</Text>
                      <Text
                        style={[styles.body, { marginTop: 3, marginLeft: 5 }]}
                      >
                        {item?.ins}
                      </Text>
                      <Text
                        style={[styles.body, { marginTop: 3, marginLeft: 5 }]}
                      >
                        {item?.marks}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </Page>
          </Document>
        </PDFViewer>
      )}
    </>
  );
};

export default Template2;
