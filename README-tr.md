# Juncture Bridge

Juncture Bridge, React önyüzü ile Node.js arka uç uygulamaları arasındaki iletişimi kolaylaştıran bir TypeScript modülüdür. Node.js uygulamalarına grafiksel kullanıcı arayüzleri sağlamak için juncture-server kütüphanesi ile birlikte çalışır.

## Özellikler

- Socket.IO kullanarak gerçek zamanlı iletişim
- TypeScript desteği
- Hem JavaScript hem de TypeScript projelerinde kullanılabilir
- Hem import hem de require sözdizimini destekler
- React ve juncture-server ile sorunsuz entegrasyon

## Kurulum

```bash
npm install juncture-bridge
```

Sunucu tarafı entegrasyonu için, ayrıca juncture-server'ı da yükleyin:

```bash
npm install juncture-server
```

## Temel Kullanım

### Önyüz (React)

Öncelikle, bir bridge örneği oluşturun:

```javascript
// utils/bridge.js
import ReactBridge from "juncture-bridge";

const bridge = new ReactBridge("http://localhost:3000");
export default bridge;
```

Ardından, bridge'i React bileşenlerinizde kullanın:

```jsx
import React, { useState, useEffect } from 'react';
import bridge from "../utils/bridge";

function App() {
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);

  const handleGreet = () => {
    bridge.execute("greet", { name: "World" })
      .then(setMessage)
      .catch(console.error);
  };

  const handleCount = () => {
    bridge.execute("count", { to: 5 })
      .then(console.log)
      .catch(console.error);
  };

  useEffect(() => {
    bridge.on("countUpdate", (data) => {
      setCount(data);
    });

    bridge.on("stateUpdate", (newState) => {
      setMessage(newState.message);
      setCount(newState.count);
    });

    return () => {
      bridge.off("countUpdate");
      bridge.off("stateUpdate");
    };
  }, []);

  return (
    <div>
      <button onClick={handleGreet}>Selamla</button>
      <p>{message}</p>
      <button onClick={handleCount}>Saymaya Başla</button>
      <p>Mevcut sayı: {count}</p>
    </div>
  );
}

export default App;
```

## API

### `ReactBridge`

#### Yapıcı

```typescript
new ReactBridge(url: string)
```

- `url`: Juncture sunucusunun URL'si

#### Metotlar

- `execute(command: string, args: any): Promise<any>`: Sunucuda bir komut çalıştırır
- `on(event: string, callback: (data: any) => void, done: () => void)`: Bir olayı dinler
- `off(event: string)`: Bir olayı dinlemeyi durdurur

## İlgili Projeler

Sunucu tarafı uygulaması için [juncture-server](https://github.com/ahgsql/juncture-server) projesine göz atın.

## Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen bir Pull Request göndermekten çekinmeyin.

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## Yazar

[ahgsql](https://github.com/ahgsql)

## Sorunlar

Herhangi bir sorunla karşılaşırsanız veya önerileriniz varsa, lütfen GitHub'da bir [issue açın](https://github.com/ahgsql/juncture-bridge/issues).

## Ana Sayfa

Daha fazla bilgi için [Juncture Bridge ana sayfasını](https://github.com/ahgsql/juncture-bridge#readme) ziyaret edin.