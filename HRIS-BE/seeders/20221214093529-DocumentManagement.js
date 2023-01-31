"use strict";
const {
  Document,
  DetailDocument,
  FieldDocument,
} = require("../models/Document");
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     
    */

    let documents = await Document.bulkCreate([
      {
        title: "SERAH TERIMA JABATAN",
        description: "STJ",
        delegated_to: "[]",
      },
      {
        title: "PERMINTAAN KARYAWAN",
        description: "FPK",
        delegated_to: "[]",
      },
      {
        title: "DATA CALON MAGANG",
        description: "DCM",
        delegated_to: "[]",
      },
      {
        title: "DATA CALON KARYAWAN",
        description: "DCK",
        delegated_to: "[]",
      },
      {
        title: "FORM PERMOHONAN IJIN",
        description: "FPI",
        delegated_to: "[]",
      },
      {
        title: "SURAT PERINTAH LEMBUR",
        description: "SPL",
        delegated_to: "[]",
      },
      {
        title: "FORM IJIN TUKAR SHIFT/OFF",
        description: "ITS",
        delegated_to: "[]",
      },
      {
        title: "DATA KARYAWAN TETAP",
        description: "PK",
        delegated_to: "[]",
      },
      {
        title: "EVALUASI KARYAWAN BARU",
        description: "PK",
        delegated_to: "[]",
      },
      {
        title: "EVALUASI KARYAWAN TAHUNAN",
        description: "PK",
        delegated_to: "[]",
      },
      {
        title: "PERMINTAAN PELATIHAN",
        description: "PK",
        delegated_to: "[]",
      },
      {
        title: "PROGRAM PELATIHAN",
        description: "PK",
        delegated_to: "[]",
      },
      {
        title: "TRAINING NEED ANALYSIS",
        description: "PK",
        delegated_to: "[]",
      },
      {
        title: "JADWAL PELATIHAN",
        description: "PK",
        delegated_to: "[]",
      },
      {
        title: "DAFTAR HADIR PELATIHAN",
        description: "PK",
        delegated_to: "[]",
      },
      {
        title: "EVALUASI PELATIHAN",
        description: "PK",
        delegated_to: "[]",
      },
      {
        title: "EFEKTIVITAS PELATIHAN",
        description: "PK",
        delegated_to: "[]",
      },
      {
        title: "PENGAJUAN PEMINDAHAN KARYAWAN",
        description: "PK",
        delegated_to: "[]",
      },
      {
        title: "EVALUASI PEMINDAHAN KARYAWAN",
        description: "PK",
        delegated_to: "[]",
      },
      {
        title: "DINAS LUAR",
        description: "PK",
        delegated_to: "[]",
      },
    ]);
    // DOCUMENT SERAH TERIMA JABATAN
    let documents_detail = await DetailDocument.bulkCreate([
      {
        document_id: documents[0].id,
        field_name: "Nama Penyerah Jabatan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[0].id,
        field_name: "Nama Penerima Jabatan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[0].id,
        field_name: "Jabatan Penyerah",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[0].id,
        field_name: "Jabatan Penerima",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[0].id,
        field_name: "Divisi Penyerah",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[0].id,
        field_name: "Divisi Penerima",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[0].id,
        field_name: "NIK Penyerah",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[0].id,
        field_name: "NIK Penerima",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[0].id,
        field_name: "Upload Tanda Tangan Penyerah",
        field_type: "file",
      },
      {
        document_id: documents[0].id,
        field_name: "Upload Tanda Tangan Penerima",
        field_type: "file",
      },
    ]);

    // DOCUMENT PERMINTAAN KARYAWAN
    let documents_detail1 = await DetailDocument.bulkCreate([
      {
        document_id: documents[1].id,
        field_name: "Nama Pemohon",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[1].id,
        field_name: "Departemen / Divisi",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[1].id,
        field_name: "Jabatan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[1].id,
        field_name: "Dibutuhkan tanggal",
        field_type: "date",
      },
      {
        document_id: documents[1].id,
        field_name: "Untuk Departemen / Divisi",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[1].id,
        field_name: "Jabatan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[1].id,
        field_name: "Uraian Tugas",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[1].id,
        field_name: "Pendidikan",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[1].id,
        field_name: "Pendidikan Khsusus",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[1].id,
        field_name: "Keterampilan",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[1].id,
        field_name: "Karakteristik Khusus",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[1].id,
        field_name: "Jumlah SDM Yang Dibutuhkan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[1].id,
        field_name: "Usia",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[1].id,
        field_name: "Bidang",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[1].id,
        field_name: "Lama Bekerja",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[1].id,
        field_name: "Alasan Penambahan",
        field_type: "checkbox",
      },
    ]);

    // FIELD DOCUMENT PERMINTAAN KARYAWAN
    let field_document2 = await FieldDocument.bulkCreate([
      {
        id_detail_document: documents_detail1[15].id,
        name: "Adanya peningkatan volume pekerjaan",
      },
      {
        id_detail_document: documents_detail1[15].id,
        name: "Untuk menggantikan karyawan yang berhenti bekerja/ mendapat promosi / mutasi",
      },
      {
        id_detail_document: documents_detail1[15].id,
        name: "Lainya",
      },
    ]);

    // DOCUMENT DATA CALON MAGANG
    let documents_detail2 = await DetailDocument.bulkCreate([
      {
        document_id: documents[2].id,
        field_name: "Nama Lengkap",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[2].id,
        field_name: "Nama Panggilan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[2].id,
        field_name: "Jenis Kelamin",
        field_type: "option",
      },
      {
        document_id: documents[2].id,
        field_name: "Alamat Sekarang",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[2].id,
        field_name: "Alamat Sesuai KTP",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[2].id,
        field_name: "No KTP",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[2].id,
        field_name: "Telp. / HP",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[2].id,
        field_name: "Tempat / Tgl. Lahir",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[2].id,
        field_name: "Asal Sekolah",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[2].id,
        field_name: "Penempatan",
        field_type: "checkbox",
      },
      {
        document_id: documents[2].id,
        field_name: "E-mail",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[2].id,
        field_name: "Akun Facebook",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[2].id,
        field_name: "Akun Instagram",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[2].id,
        field_name: "Bersedia di tempatkan di bagian sesuai perusahaan",
        field_type: "option",
      },
      {
        document_id: documents[2].id,
        field_name: "Sekolah Dasar",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[2].id,
        field_name: "Sekolah Menengah Pertama",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[2].id,
        field_name: "Sekolah Menengah Atas",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[2].id,
        field_name: "Perguruan Tinggi",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[2].id,
        field_name: "Jurusan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[2].id,
        field_name: "Nama Guru/Dosen Pembimbing",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[2].id,
        field_name: "Harapan Setelah Magang",
        field_type: "short_answer",
        data_type: "text",
      },
    ]);

    // FIELD DOCUMENT DATA CALON MAGANG
    let field_document3 = await FieldDocument.bulkCreate([
      {
        id_detail_document: documents_detail2[2].id,
        name: "Laki - Laki",
      },
      {
        id_detail_document: documents_detail2[2].id,
        name: "Perempuan",
      },
      {
        id_detail_document: documents_detail2[9].id,
        name: "FBS",
      },
      {
        id_detail_document: documents_detail2[9].id,
        name: "OFFICE",
      },
      {
        id_detail_document: documents_detail2[9].id,
        name: "FBP",
      },
      {
        id_detail_document: documents_detail2[13].id,
        name: "YA",
      },
      {
        id_detail_document: documents_detail2[13].id,
        name: "TIDAK",
      },
    ]);

    // DOCUMENT DATA CALON KARYAWAN
    let documents_detail3 = await DetailDocument.bulkCreate([
      {
        document_id: documents[3].id,
        field_name: "Nama Lengkap",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Nama Panggilan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Jenis Kelamin",
        field_type: "option",
      },
      {
        document_id: documents[3].id,
        field_name: "Alamat Sekarang",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Alamat Sesuai KTP",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "No KTP",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Telp. / HP",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Tempat / Tgl. Lahir",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Asal Sekolah",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Penempatan",
        field_type: "checkbox",
      },
      {
        document_id: documents[3].id,
        field_name: "E-mail",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Akun Facebook",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Akun Instagram",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Bersedia di tempatkan di bagian sesuai perusahaan",
        field_type: "option",
      },
      {
        document_id: documents[3].id,
        field_name: "Tempat Tinggal",
        field_type: "option",
      },
      {
        document_id: documents[3].id,
        field_name: "Status",
        field_type: "option",
      },
      {
        document_id: documents[3].id,
        field_name: "Sekolah Dasar",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Sekolah Menengah Pertama",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Sekolah Menengah Atas",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Perguruan Tinggi",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Jurusan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Keahlian",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Hobby / Kegemaran",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Kegiatan Organisasi Yang Pernah/Masih Diikuti",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[3].id,
        field_name: "Kegiatan Organisasi Yang Pernah/Masih Diikuti",
        field_type: "paragraph",
        data_type: "text",
      },
    ]);

    // FIELD DOCUMENT DATA CALON KARYAWAN
    let field_document4 = await FieldDocument.bulkCreate([
      {
        id_detail_document: documents_detail3[2].id,
        name: "Laki - Laki",
      },
      {
        id_detail_document: documents_detail3[2].id,
        name: "Perempuan",
      },
      {
        id_detail_document: documents_detail3[9].id,
        name: "FBS",
      },
      {
        id_detail_document: documents_detail3[9].id,
        name: "OFFICE",
      },
      {
        id_detail_document: documents_detail3[9].id,
        name: "FBP",
      },
      {
        id_detail_document: documents_detail3[13].id,
        name: "YA",
      },
      {
        id_detail_document: documents_detail3[13].id,
        name: "TIDAK",
      },
      {
        id_detail_document: documents_detail3[14].id,
        name: "Rumah Sendiri",
      },
      {
        id_detail_document: documents_detail3[14].id,
        name: "Rumah Keluarga",
      },
      {
        id_detail_document: documents_detail3[14].id,
        name: "Sewa / Kontrak",
      },
      {
        id_detail_document: documents_detail3[14].id,
        name: "Kost",
      },
      {
        id_detail_document: documents_detail3[15].id,
        name: "Belum Menikah",
      },
      {
        id_detail_document: documents_detail3[15].id,
        name: "Menikah",
      },
      {
        id_detail_document: documents_detail3[15].id,
        name: "Janda / Duda",
      },
    ]);

    // DOCUMENT FORM PERMOHONAN IZIN
    let documents_detail4 = await DetailDocument.bulkCreate([
      {
        document_id: documents[4].id,
        field_name: "Jenis Permohonan",
        field_type: "option",
      },
      {
        document_id: documents[4].id,
        field_name: "Nama Jabatan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[4].id,
        field_name: "N.I.K",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[4].id,
        field_name: "Departemen / Divisi",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[4].id,
        field_name: "Jabatan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[4].id,
        field_name: "Alasan Cuti / Ijin",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[4].id,
        field_name: "Tanggal Pengajuan",
        field_type: "date",
      },
      {
        document_id: documents[4].id,
        field_name: "Jam Pengajuan",
        field_type: "time",
      },
      {
        document_id: documents[4].id,
        field_name: "Jumlah Hari",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[4].id,
        field_name: "Alamat Selama Cuti / Izin",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[4].id,
        field_name: "Kembali Bekerja Pada Tanggal",
        field_type: "date",
      },
    ]);

    // FIELD DOCUMENT FORM PERMOHONAN IZIN
    let field_document5 = await FieldDocument.bulkCreate([
      {
        id_detail_document: documents_detail4[0].id,
        name: "CUTI / IZIN / PH",
      },
      {
        id_detail_document: documents_detail4[0].id,
        name: "P-24",
      },
    ]);

    // DOCUMENT IJIN TUKAR SHIFT / OFF
    let documents_detail5 = await DetailDocument.bulkCreate([
      {
        document_id: documents[6].id,
        field_name: "Pada Hari",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[6].id,
        field_name: "Pada Tanggal",
        field_type: "date",
      },
      {
        document_id: documents[6].id,
        field_name: "Nama",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[6].id,
        field_name: "Jabatan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[6].id,
        field_name: "Jam Tugas",
        field_type: "time",
      },
      {
        document_id: documents[6].id,
        field_name: "Tanggal",
        field_type: "date",
      },
      {
        document_id: documents[6].id,
        field_name: "Dept",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[6].id,
        field_name: "Keperluan tukar shift/OFF",
        field_type: "short_answer",
        data_type: "text",
      },
    ]);
    // SURAT PERINTAH LEMBUR
    let documents_detail6 = await DetailDocument.bulkCreate([
      {
        document_id: documents[5].id,
        field_name: "Tanggal SPL",
        field_type: "date",
      },
      {
        document_id: documents[5].id,
        field_name: "Departemen",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[5].id,
        field_name: "Lembur Pada Waktu",
        field_type: "time",
      },
      {
        document_id: documents[5].id,
        field_name: "Lembur Pada Tanggal",
        field_type: "date",
      },
      {
        document_id: documents[5].id,
        field_name: "Uraian Tugas Lembur",
        field_type: "paragraph",
        data_type: "text",
      },
    ]);
    // DATA KARYAWAN TETAP
    let documents_detail7 = await DetailDocument.bulkCreate([
      {
        document_id: documents[7].id,
        field_name: "Upload Pas Foto 4x6",
        field_type: "file",
      },
      {
        document_id: documents[7].id,
        field_name: "Nama Lengkap",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[7].id,
        field_name: "Nama Panggilan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[7].id,
        field_name: "Alamat Setempat",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[7].id,
        field_name: "Alamat KTP",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[7].id,
        field_name: "Telp. / HP",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[7].id,
        field_name: "Tempat / Tgl. Lahir",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[7].id,
        field_name: "Kebangsaan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[7].id,
        field_name: "Agama",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[7].id,
        field_name: "No. KTP",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[7].id,
        field_name: "No. SIM A / C",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[7].id,
        field_name: "Pendidikan Formal",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[7].id,
        field_name: "Pendidikan Non Formal / Kusus",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[7].id,
        field_name: "Keahlian",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[7].id,
        field_name: "Hobby / Kegemaran",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[7].id,
        field_name: "Tempat Tinggal",
        field_type: "option",
      },
      {
        document_id: documents[7].id,
        field_name: "Status",
        field_type: "option",
      },
      {
        document_id: documents[7].id,
        field_name: "Jumlah Anak",
        field_type: "short_answer",
        data_type: "text",
      },
    ]);

    // FIELD DOCUMENT DATA KAYAWAN TETAP
    let field_document8 = await FieldDocument.bulkCreate([
      {
        id_detail_document: documents_detail7[15].id,
        name: "Rumah Sendiri",
      },
      {
        id_detail_document: documents_detail7[15].id,
        name: "Rumah Keluarga",
      },
      {
        id_detail_document: documents_detail7[15].id,
        name: "Sewa / Kontrak",
      },
      {
        id_detail_document: documents_detail7[15].id,
        name: "Kost",
      },
      {
        id_detail_document: documents_detail7[16].id,
        name: "Belum Menikah",
      },
      {
        id_detail_document: documents_detail7[16].id,
        name: "Menikah",
      },
      {
        id_detail_document: documents_detail7[16].id,
        name: "Janda / Duda",
      },
    ]);

    // EVALUASI KARYAWAN BARU
    let documents_detail8 = await DetailDocument.bulkCreate([
      {
        document_id: documents[8].id,
        field_name: "Karyawan Yang Dinilai",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[8].id,
        field_name: "DEP / DIV",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[8].id,
        field_name: "Tanggal Masuk",
        field_type: "date",
      },
      {
        document_id: documents[8].id,
        field_name: "Periode",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[8].id,
        field_name: "Jabatan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[8].id,
        field_name: "Nilai Disiplin",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[8].id,
        field_name: "Nilai Kerjasama",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[8].id,
        field_name: "Nilai Komunikasi",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[8].id,
        field_name: "Nilai Inisiatif",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[8].id,
        field_name: "Nilai Kerajinan / Kerapian",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[8].id,
        field_name: "Nilai Sikap",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[8].id,
        field_name: "Nilai Kecepatan Kerja",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[8].id,
        field_name: "Kesimpulan",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[8].id,
        field_name: "KETERANGAN",
        field_type: "option",
      },
      {
        document_id: documents[8].id,
        field_name: "Catatan",
        field_type: "paragraph",
        data_type: "text",
      },
    ]);

    // FIELD EVALUASI KARYAWAN BARU
    let field_document9 = await FieldDocument.bulkCreate([
      {
        id_detail_document: documents_detail8[13].id,
        name: "LOLOS",
      },
      {
        id_detail_document: documents_detail8[13].id,
        name: "TIDAK LOLOS",
      },
    ]);

    // EVALUASI KARYAWAN TAHUNAN
    let documents_detail9 = await DetailDocument.bulkCreate([
      {
        document_id: documents[9].id,
        field_name: "Karyawan Yang Dinilai",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[9].id,
        field_name: "DEP / DIV",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[9].id,
        field_name: "Periode",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[9].id,
        field_name: "Jabatan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[9].id,
        field_name: "Rencana karier dalam 1 - 2 tahun ke depan",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[9].id,
        field_name: "Alasan / dasar pertimbangan dari pernyataan diatas :",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[9].id,
        field_name:
          "Training yang saya butuhkan untuk mendukung rencana di atas :",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[9].id,
        field_name:
          "Apa yang akan Anda lakukan bagi Perusahaan dalam 6 bulan ke depan?",
        field_type: "paragraph",
        data_type: "text",
      },
    ]);

    // PERMINTAAN PELATIHAN
    let documents_detail10 = await DetailDocument.bulkCreate([
      {
        document_id: documents[10].id,
        field_name: "Nama",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[10].id,
        field_name: "Departemen",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[10].id,
        field_name: "Jabatan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[10].id,
        field_name: "Materi Pelatihan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[10].id,
        field_name: "Alasan Latihan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[10].id,
        field_name: "Tujuan Pelatihan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[10].id,
        field_name: "Nama Peserta",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[10].id,
        field_name: "Pelaksanaan",
        field_type: "option",
      },
      {
        document_id: documents[10].id,
        field_name: "Tingkat Kebutuhan",
        field_type: "option",
      },
    ]);

    // FIELD DOCUMENT PERMINTAAN PELATIHAN
    let field_document11 = await FieldDocument.bulkCreate([
      {
        id_detail_document: documents_detail10[7].id,
        name: "EKSTERNAL",
      },
      {
        id_detail_document: documents_detail10[7].id,
        name: "INTERNAL",
      },
      {
        id_detail_document: documents_detail10[8].id,
        name: "MENDESAK",
      },
      {
        id_detail_document: documents_detail10[8].id,
        name: "TIDAK MENDESAK",
      },
    ]);

    // PROGRAM PELATIHAN
    let documents_detail11 = await DetailDocument.bulkCreate([
      {
        document_id: documents[11].id,
        field_name: "Materi Pelatihan",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[11].id,
        field_name: "Metode Pelatihan",
        field_type: "option",
      },
    ]);

    // FIELD DOCUMENT PROGRAM PELATIHAN
    let field_document12 = await FieldDocument.bulkCreate([
      {
        id_detail_document: documents_detail11[1].id,
        name: "EKSTERNAL",
      },
      {
        id_detail_document: documents_detail11[1].id,
        name: "INTERNAL",
      },
    ]);

    // PROGRAM PELATIHAN
    let documents_detail12 = await DetailDocument.bulkCreate([
      {
        document_id: documents[12].id,
        field_name: "Materi Pelatihan",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[12].id,
        field_name: "Jenis Program Training",
        field_type: "option",
      },
      {
        document_id: documents[12].id,
        field_name: "Proses Training",
        field_type: "option",
      },
      {
        document_id: documents[12].id,
        field_name: "Lembaga Pelatihan",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[12].id,
        field_name: "Trainer",
        field_type: "paragraph",
        data_type: "text",
      },
    ]);

    // FIELD DOCUMENT PROGRAM PELATIHAN
    let field_document13 = await FieldDocument.bulkCreate([
      {
        id_detail_document: documents_detail12[1].id,
        name: "Training",
      },
      {
        id_detail_document: documents_detail12[1].id,
        name: "Workshop",
      },
      {
        id_detail_document: documents_detail12[2].id,
        name: "EKSTERNAL",
      },
      {
        id_detail_document: documents_detail12[2].id,
        name: "INTERNAL",
      },
    ]);

    // JADWAL PELATIHAN
    let documents_detail13 = await DetailDocument.bulkCreate([
      {
        document_id: documents[13].id,
        field_name: "Tanggal Pelatihan",
        field_type: "date",
      },
      {
        document_id: documents[13].id,
        field_name: "Departemen",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[13].id,
        field_name: "Materi Pelatihan",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[13].id,
        field_name: "Metode Pelatihan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[13].id,
        field_name: "Trainer",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[13].id,
        field_name: "Tempat Pelatihan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[13].id,
        field_name: "Peserta",
        field_type: "short_answer",
        data_type: "text",
      },
    ]);

    // DAFTAR HADIR PELATIHAN
    let documents_detail14 = await DetailDocument.bulkCreate([
      {
        document_id: documents[14].id,
        field_name: "Tanggal",
        field_type: "date",
      },
      {
        document_id: documents[14].id,
        field_name: "Waktu",
        field_type: "time",
      },
      {
        document_id: documents[14].id,
        field_name: "Tempat",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[14].id,
        field_name: "Pembicara",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[14].id,
        field_name: "Pokok Bahasan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[14].id,
        field_name: "Nama",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[14].id,
        field_name: "Dept / Bagian",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[14].id,
        field_name: "NIK",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[14].id,
        field_name: "Tanda Tangan",
        field_type: "file",
      },
    ]);

    // EVALUASI PELATIHAN
    let documents_detail15 = await DetailDocument.bulkCreate([
      {
        document_id: documents[15].id,
        field_name: "Nama / NIK",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[15].id,
        field_name: "Bagian",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[15].id,
        field_name: "Topik Pelatihan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[15].id,
        field_name: "Tempat / Tgl. Lahir / Jam",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[15].id,
        field_name: "Penyelenggara",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[15].id,
        field_name: "Penyaji / Tutor",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[15].id,
        field_name: "Knowledge yang didapat",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[15].id,
        field_name: "Skill yang didapat",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[15].id,
        field_name: "Saran",
        field_type: "paragraph",
        data_type: "text",
      },
    ]);

    // EFEKTIVITAS PELATIHAN
    let documents_detail16 = await DetailDocument.bulkCreate([
      {
        document_id: documents[16].id,
        field_name: "Nama Peserta",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[16].id,
        field_name: "Departemen",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[16].id,
        field_name: "Jabatan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[16].id,
        field_name: "Judul Pelatihan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[16].id,
        field_name: "Tgl. Pelatihan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[16].id,
        field_name: "Trainer",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[16].id,
        field_name: "Faktor Penghambat",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[16].id,
        field_name: "Faktor Pendukung",
        field_type: "paragraph",
        data_type: "text",
      },
    ]);

    // PENGAJUAN PEMINDAHAN KARYAWAN
    let documents_detail17 = await DetailDocument.bulkCreate([
      {
        document_id: documents[17].id,
        field_name: "Jenis Pemindahan",
        field_type: "option",
      },
      {
        document_id: documents[17].id,
        field_name: "Nama Pemohon",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[17].id,
        field_name: "Jabatan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[17].id,
        field_name: "Departemen",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[17].id,
        field_name: "Nama Karyawan Yang Dipindah",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[17].id,
        field_name: "Jabatan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[17].id,
        field_name: "Departemen",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[17].id,
        field_name: "Dipindah ke: ",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[17].id,
        field_name: "Jabatan ",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[17].id,
        field_name: "Departemen",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[17].id,
        field_name: "Alasan Pemindahan",
        field_type: "short_answer",
        data_type: "text",
      },
    ]);

    // FIELD DOCUMENT PEMINDAHAN KARYAWAN
    let field_document17 = await FieldDocument.bulkCreate([
      {
        id_detail_document: documents_detail17[0].id,
        name: "MUTASI",
      },
      {
        id_detail_document: documents_detail17[0].id,
        name: "ROLLING",
      },
      {
        id_detail_document: documents_detail17[0].id,
        name: "DEMOSI",
      },
      {
        id_detail_document: documents_detail17[0].id,
        name: "PROMOSI",
      },
    ]);

    // EVALUASI PEMINDAHAN KARYAWAN
    let documents_detail18 = await DetailDocument.bulkCreate([
      {
        document_id: documents[18].id,
        field_name: "Nama Karyawan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[18].id,
        field_name: "Jabatan Baru",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[18].id,
        field_name: "Departemen",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[18].id,
        field_name: "Nama Penilai",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[18].id,
        field_name: "Jabatan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[18].id,
        field_name: "Departemen",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[18].id,
        field_name: "Kata Masukkan",
        field_type: "paragraph",
        data_type: "text",
      },
      {
        document_id: documents[18].id,
        field_name: "Kesimpulan",
        field_type: "paragraph",
        data_type: "text",
      },
    ]);

    // DINAS LUAR
    let documents_detail19 = await DetailDocument.bulkCreate([
      {
        document_id: documents[19].id,
        field_name: "Nama",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[19].id,
        field_name: "Jabatan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[19].id,
        field_name: "Departemen",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[19].id,
        field_name: "Tujuan Dinas",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[19].id,
        field_name: "Keperluan",
        field_type: "short_answer",
        data_type: "text",
      },
      {
        document_id: documents[19].id,
        field_name: "Atas Perintah",
        field_type: "short_answer",
        data_type: "text",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
    await Document.destroy({ where: {}, truncate: true });
    await DetailDocument.destroy({ where: {}, truncate: true });
    await FieldDocument.destroy({ where: {}, truncate: true });
    await queryInterface.bulkDelete("documents", null, {});
  },
};
