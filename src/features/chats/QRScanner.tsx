import { useState, useCallback } from 'react'
import { Scanner as QrScanner } from '@yudiel/react-qr-scanner';
// import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { useApi } from '@/hooks/use-api';
import   Result  from './type.ts'
import { AxiosError } from 'axios';
interface QRScannerProps {
  setResult: (result: Result) => void;
  onClose: () => void;
}


// QRScanner.tsx
// QRScanner.tsx
export const QRScanner: React.FC<QRScannerProps> = ({ setResult, onClose }) => {
  const api = useApi(true);
  const [error, setError] = useState<string | null>(null);

  const handleScan = useCallback(async (result: string) => {
    if (result) {
      try {
        const response = await api.put(`${import.meta.env.VITE_API_URL}api/v1/admin/tickets/updateEntryStatus`,{
          ticketCode: result
        })
        // setResult(`Updated entry status for ${response.data.name}, \n Mobile: ${response.data.mobile}, \n Email: ${response.data.email}` );
        setResult({
          name: response.data.firstName + " " + response.data.lastName,
          phone: response.data.phone,
          email: response.data.email,
          teamSize: response.data.teamMembersNumber,
          segmentName: response.data.participationType==="team"?response.data.teamSegments:response.data.soloSegment,
          amount: response.data.teamSegmentPrice>0?response.data.teamSegmentPrice:response.data.soloSegmentPrice,
          institution: response.data.institution
        })
        onClose();
      } catch (err) {
        if (err instanceof AxiosError) {
            setError(`Failed to process QR code: ${err.response?.data?.message}`);

        } else {
          setError('An unexpected error occurred');
        }
      }
    }
  }, [setResult, onClose]);

  return (
    <div className="relative">
      <Button onClick={onClose} className="absolute top-4 right-4 z-50">
        Close Scanner
      </Button>

      <div className="rounded-lg overflow-hidden">
        <QrScanner
          onScan={(result) => handleScan(result[0].rawValue)}
          // onDecode={handleScan}
          onError={() => setError( 'Failed to access camera')}
          styles={{

            container: {
              width: '100%',
              height: '100%',
              position: 'relative',
            }
            // video: CSSProperties;
            // finderBorder: number;
          }}
        />
      </div>

      {error && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg text-red-600">
            {error}
          </div>
        </div>
      )}
    </div>
  );
};
