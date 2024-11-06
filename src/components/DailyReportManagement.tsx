import React, { useState, useEffect } from 'react';
import { Calendar, Filter, Download, FileText } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// ... (previous interfaces remain the same)

// Update the styles
const styles = StyleSheet.create({
  page: { 
    padding: 30,
    backgroundColor: '#ffffff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20
  },
  title: { 
    fontSize: 24,
    marginBottom: 5
  },
  subtitle: { 
    fontSize: 14,
    marginBottom: 3
  },
  table: { 
    display: 'table', 
    width: 'auto', 
    marginVertical: 10,
    borderStyle: 'solid', 
    borderWidth: 1
  },
  tableRow: { 
    margin: 'auto', 
    flexDirection: 'row'
  },
  tableHeader: {
    backgroundColor: '#f3f4f6'
  },
  tableCell: { 
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 8
  }
});

// Update the MyDocument component
const MyDocument: React.FC<{
  patients: (Patient | Consultation)[];
  appointments: Appointment[];
  selectedDate: string;
  selectedSpecialty: string;
}> = ({ patients, appointments, selectedDate, selectedSpecialty }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Patient Report</Text>
        <Text style={styles.subtitle}>Date: {selectedDate}</Text>
        {selectedSpecialty && (
          <Text style={styles.subtitle}>Specialty: {selectedSpecialty}</Text>
        )}
      </View>
      
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={styles.tableCell}><Text>MRN</Text></View>
          <View style={styles.tableCell}><Text>Patient Name</Text></View>
          <View style={styles.tableCell}><Text>Age/Gender</Text></View>
          <View style={styles.tableCell}><Text>Specialty</Text></View>
          <View style={styles.tableCell}><Text>Diagnosis/Department</Text></View>
        </View>
        {patients.map((patient, index) => (
          <View style={styles.tableRow} key={`patient-${index}`}>
            <View style={styles.tableCell}><Text>{patient.mrn}</Text></View>
            <View style={styles.tableCell}><Text>{patient.patient_name}</Text></View>
            <View style={styles.tableCell}>
              <Text>{patient.age} / {patient.gender}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>
                {(patient as Patient).specialty || (patient as Consultation).consultation_specialty}
              </Text>
            </View>
            <View style={styles.tableCell}>
              <Text>
                {(patient as Patient).diagnosis || (patient as Consultation).requesting_department}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.title}>Appointments</Text>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={styles.tableCell}><Text>Patient Name</Text></View>
          <View style={styles.tableCell}><Text>Medical Number</Text></View>
          <View style={styles.tableCell}><Text>Specialty</Text></View>
          <View style={styles.tableCell}><Text>Type</Text></View>
          <View style={styles.tableCell}><Text>Notes</Text></View>
        </View>
        {appointments.map((appointment, index) => (
          <View style={styles.tableRow} key={`appointment-${index}`}>
            <View style={styles.tableCell}><Text>{appointment.patient_name}</Text></View>
            <View style={styles.tableCell}><Text>{appointment.patient_medical_number}</Text></View>
            <View style={styles.tableCell}><Text>{appointment.clinic_specialty}</Text></View>
            <View style={styles.tableCell}><Text>{appointment.appointment_type}</Text></View>
            <View style={styles.tableCell}><Text>{appointment.notes}</Text></View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// ... (rest of the component remains the same)

export default DailyReportManagement;