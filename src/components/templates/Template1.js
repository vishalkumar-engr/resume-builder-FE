import React, { useEffect, useState } from "react";
import { Page, Text, View, Document, Link } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { styles } from "./TemplateSheet";

const Template1 = ({ userData }) => {
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
            <Page size="A4" scale={1} style={styles.page}>
              <View style={[styles.flex, styles.section]}>
                {/* Left */}
                <View style={[styles.left, styles?.subSection]}>
                  {/* Basic */}
                  <View>
                    {state?.basic?.first && (
                      <Text style={styles.header}>
                        {`${state?.basic?.first} ${state?.basic?.last}`}
                      </Text>
                    )}
                    {state?.basic?.profession && (
                      <Text
                        style={styles.subHeader}
                      >{`${state?.basic?.profession}`}</Text>
                    )}
                    <View>
                      {state?.basic?.email && (
                        <Text style={styles.body}>
                          Mail: {state?.basic?.email}
                        </Text>
                      )}
                      {state?.basic?.phone && (
                        <Text style={styles.body}>
                          Ph: {state?.basic?.phone}
                        </Text>
                      )}
                      {state?.basic?.city && state?.basic?.state && (
                        <Text style={styles.body}>
                          {state?.basic?.city}, {state?.basic?.state}
                          {state?.basic?.pinCode && state?.basic?.pinCode !== ""
                            ? `(${state?.basic?.pinCode})`
                            : ""}
                        </Text>
                      )}
                    </View>
                    {/* Socials */}
                    <View>
                      <Text style={styles.header}>Social</Text>
                      {state?.social?.map((item) => {
                        return (
                          <Text key={item?.title}>
                            <Link
                              style={[styles.link, styles.subHeader]}
                              src={item?.url}
                            >
                              {item?.title}
                            </Link>
                          </Text>
                        );
                      })}
                    </View>
                    {/* Summary */}
                    <View>
                      <Text style={styles.header}>Summary</Text>
                      <Text style={styles.body}>{state?.basic?.about}</Text>
                    </View>
                    {/* Education */}
                    <View>
                      <Text style={styles.header}>Education</Text>
                      {state?.education?.map((item) => {
                        return (
                          <View key={item?.degree}>
                            <Text style={styles.subHeader}>{item?.degree}</Text>
                            <Text style={styles.body}>{item?.ins}</Text>
                            <Text style={styles.body}>{item?.marks}</Text>
                          </View>
                        );
                      })}
                    </View>
                    {/* Technical Skills */}
                    <View>
                      <Text style={styles.header}>Technical Skills</Text>
                      {state?.technicalSkills?.map((item) => {
                        return (
                          <View key={item}>
                            <Text style={styles.body}>{item.key}</Text>
                          </View>
                        );
                      })}
                    </View>
                    {/* Personal Skills */}
                    <View>
                      <Text style={styles.header}>Personal Skills</Text>
                      {state?.personalSkills?.map((item) => {
                        return (
                          <View key={item}>
                            <Text style={styles.body}>{item.key}</Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
                <View style={styles.right}>
                  {/* Experience */}
                  <View>
                    <Text style={styles.header}>Experience</Text>
                    {state?.experience?.map((item) => {
                      return (
                        <View key={item?.orgName}>
                          <Text style={styles.subHeader}>{item?.orgName}</Text>
                          <View style={styles.flex}>
                            <View>
                              <Text style={styles.body}>
                                {item?.designation}
                              </Text>
                            </View>
                            <View>
                              <Text style={styles.body}>
                                , {item?.location}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.flex}>
                            <View>
                              <Text style={styles.body}>{item?.startDate}</Text>
                            </View>
                            <View>
                              <Text style={styles.body}>
                                {" "}
                                - {item?.endDate}
                              </Text>
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
                  <View>
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
                              <Text style={styles.body}>
                                {" "}
                                - {item?.endDate}
                              </Text>
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
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      )}
    </>
  );
};

export default Template1;
