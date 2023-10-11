import { Card, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { Html5QrcodeScanner } from 'html5-qrcode';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

const TABLE_HEAD = ['Name', 'Kelas', 'Email', 'Kontak Siswa', 'Kontak Ortu', 'Hadir', 'Tanggal'];

export default function DashboardSis() {
  const [scann, setScann] = useState(null);
  const [user_id, setUser_id] = useState('');
  const [kehadiran, setKehadiran] = useState();
  const [refresh, setRefresh] = useState(false);
  const [src, setSrc] = useState('');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('scanner', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScann(result);
    }
    function error(err) {
      console.warn(err);
    }
  }, [refresh]);

  useEffect(() => {
    const funcCall = async () => {
      try {
        const dataHadir = await axios.get('http://127.0.0.1:8000/api/absens', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 1|tM2yiOpajCcYHGLw58WjM60KTgt0GfxfKZMMMHu0',
          },
        });
        setKehadiran(dataHadir.data);
        const tgl = new Date(dataHadir.data.updated_at);
      } catch (err) {
        throw err;
      }
    };
    funcCall();
  }, [refresh]);
  useEffect(() => {
    if (scann) {
      setAbsen();
      setScann(null);
    }
  }, [scann]);

  function generatedCode() {
    QRCode.toDataURL('http://127.0.0.1:8000/api/absens').then(setSrc);
  }

  const setAbsen = () => {
    console.log(new Date().toISOString(new Date().getTime()));
    const setAbsenn = async () => {
      try {
        const dataSuccess = await axios.post(
          scann,
          {
            siswa_id: 2,
            kelas_id: 1,
            waktu_in: new Date().toISOString(new Date().getTime()),
            waktu_out: '00:00:00',
            total_durasi: '00:00:00',
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer 1|tM2yiOpajCcYHGLw58WjM60KTgt0GfxfKZMMMHu0',
            },
          }
        );
        setRefresh(!refresh);
        console.log(dataSuccess);
      } catch (err) {
        throw err;
      }
    };

    setAbsenn();
    // return;
  };
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <section className="w-1/2 flex justify-center items-center flex-col my-8">
        {user_id && <img src={src} alt="qrcode" />}
        <input type="text" className="outline-1 outline-black border border-2 border-black p-2 mb-2" value={user_id} onChange={(e) => setUser_id(e.target.value)} />
        <button className="py-[10px] px-10 bg-black text-gray-300 mb-6" onClick={generatedCode}>
          Generate
        </button>
        {!scann && <div id="scanner"></div>}
      </section>

      <section className="w-full">
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {kehadiran?.map(({ waktu_in, updated_at, date, siswa: { fullname, email, kontak_sis, kontak_ort }, kelas: { nama_kelas } }, index) => (
                <tr key={index} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {fullname}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {nama_kelas}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {email}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                      {kontak_sis}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                      {kontak_ort}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                      {waktu_in}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                      {`${new Date(updated_at).getDate()}/${new Date(updated_at).getMonth() + 1}/${new Date(updated_at).getFullYear()}`}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
