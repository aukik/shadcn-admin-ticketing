import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'

import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
// Fake Data



import { QRScanner } from './QRScanner.tsx' // Add this import
import   Result  from './type.ts'

// Chats.tsx
// Chats.tsx
export default function Chats() {
  const [showScanner, setShowScanner] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  return (
    <>
      <Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setResult(null);  // Reset previous result
              setShowScanner(true);
            }}
          >
            Scan QR
          </Button>
          <ThemeSwitch />
        </div>
      </Header>

      <Main>
        {showScanner ? (
          <div className="h-[calc(100vh-140px)]">
            <QRScanner
              setResult={(result:Result) => {
                setResult(result);
                setShowScanner(false);
              }}
              onClose={() => setShowScanner(false)}
            />
          </div>
        ) : (
          <div className="p-4">
            {result ? (
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h2 className="text-lg font-bold mb-2">Scanned QR Content:</h2>
                <p className="font-mono break-all text-green-500">Success!</p>
                <p className="font-mono break-all text-green-500">Name: {result.name}</p>
                <p className="font-mono break-all text-green-500">Phone: {result.phone}</p>
                <p className="font-mono break-all text-green-500">Segment: {result.segmentName}</p>
                <p className="font-mono break-all text-green-500">Amount: {result.amount}</p>
                <p className="font-mono break-all text-green-500">Institution: {result.institution}</p>
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400">
                No QR code scanned yet
              </div>
            )}
          </div>
        )}
      </Main>
    </>
  );
}
