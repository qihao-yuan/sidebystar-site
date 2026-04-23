import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#05060A',
          borderRadius: 8,
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            background: 'linear-gradient(135deg, #4B6BFB, #B19CF4, #7DD3FC)',
            boxShadow: '0 0 12px #7DD3FC',
          }}
        />
      </div>
    ),
    size
  );
}
