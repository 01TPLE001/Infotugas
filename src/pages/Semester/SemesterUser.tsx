import { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDot } from "react-loading-indicators";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface Semester {
  semester_id: number;
  semester_number: number;
}

export default function Semester() {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  // const [newSemester, setNewSemester] = useState(""); // ADMIN ONLY
  const [loading, setLoading] = useState(false);
  // const [editId, setEditId] = useState<number | null>(null); // ADMIN ONLY
  // const [editValue, setEditValue] = useState<string>(""); // ADMIN ONLY
  // const [showDeleteModal, setShowDeleteModal] = useState(false); // ADMIN ONLY
  // const [deleteId, setDeleteId] = useState<number | null>(null); // ADMIN ONLY

  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    fetchSemesters();
  }, []);

  const fetchSemesters = async () => {
    if (!API_URL) {
      console.error("API_URL tidak ditemukan");
      return;
    }
    setLoading(true);
    const token = Cookies.get("token");
    try {
      const res = await axios.get(`${API_URL}/semester`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      setSemesters(res.data.data);
    } catch (err) {
      console.error("Gagal mengambil data semester:", err);
    }
    setLoading(false);
  };

  // ADMIN ONLY: Tambah semester
  // const handleAddSemester = async () => { ... }

  // ADMIN ONLY: Hapus semester
  // const handleDeleteSemester = async () => { ... }

  // ADMIN ONLY: Edit semester
  // const startEdit = (semester: Semester) => { ... }
  // const cancelEdit = () => { ... }
  // const saveEdit = async (semester_id: number) => { ... }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-2 text-gray-950 dark:text-white margin">Student Dashboard</h1>
  <hr
    style={{
      border: "none",
      height: "2px",
      backgroundColor: "#333",
    }}
  />
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Pilih Semester</h2>
      {/* ADMIN ONLY: Form tambah semester */}
      {/*
      <div className="flex gap-2 mb-4">
        <input
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-2 py-1 rounded"
          value={newSemester}
          onChange={(e) => setNewSemester(e.target.value)}
          placeholder="Tambah Semester"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-1 rounded"
          onClick={handleAddSemester}
        >
          Add
        </button>
      </div>
      */}

      {loading && (
        <ThreeDot color="#32cd32" size="medium" text="" textColor="" />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {semesters.length > 0 ? (
          semesters.map((s) => (
            <div key={s.semester_id} className="mb-2">
              <div
                className="cursor-pointer border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 rounded shadow transition-all duration-300 hover:ring-2 hover:ring-blue-400"
                title="Lihat Week"
                onClick={() => navigate(`/week-user/${s.semester_id}`)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                    Semester {s.semester_number}
                  </h3>
                  <span className="text-xs text-blue-500">Lihat Week</span>
                </div>
                {/* ADMIN ONLY: Tombol Edit & Hapus */}
                {/*
                <div className="flex gap-2 mt-3">
                  <button
                    className="px-2 py-1 text-xs bg-yellow-500 hover:bg-yellow-600 text-white rounded transition-all"
                    onClick={e => {
                      e.stopPropagation();
                      startEdit(s);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded transition-all"
                    onClick={e => {
                      e.stopPropagation();
                      setShowDeleteModal(true);
                      setDeleteId(s.semester_id);
                    }}
                  >
                    Hapus
                  </button>
                </div>
                */}
              </div>
              {/* ADMIN ONLY: Card Edit muncul di bawah card semester */}
              {/*
              {editId === s.semester_id && (
                <div className="animate-fade-in-up transition-all duration-300">
                  <div className="mt-2 border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900 p-4 rounded shadow flex items-center gap-2">
                    <input
                      className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-2 py-1 rounded w-20"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                    />
                    <button
                      className="px-2 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded"
                      onClick={() => saveEdit(s.semester_id)}
                    >
                      Simpan
                    </button>
                    <button
                      className="px-2 py-1 text-xs bg-gray-400 hover:bg-gray-500 text-white rounded"
                      onClick={cancelEdit}
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}
              */}
            </div>
          ))
        ) : (
          <div className="text-gray-500 dark:text-gray-400">Belum ada semester tersedia.</div>
        )}
      </div>

      {/* ADMIN ONLY: Modal Konfirmasi Hapus */}
      {/*
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-fade-in-up min-w-[300px]">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Konfirmasi Hapus</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">Apakah kamu yakin ingin menghapus semester ini?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                onClick={() => setShowDeleteModal(false)}
              >
                Batal
              </button>
              <button
                className="px-4 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                onClick={handleDeleteSemester}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
      */}

      {/* Animasi fade-in-up */}
      <style>
        {`
          .animate-fade-in-up {
            animation: fadeInUp 0.3s;
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
