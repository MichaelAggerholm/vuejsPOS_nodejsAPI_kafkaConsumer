1. Kør kafka med:

```bash
docker-compse up -d
```

2. Kør nodeAPI med:

```node
node app.js
```

3. Kør vue app med:

```npm
npm run serve
```

4. se kafka resultat:

```docker
docker exec -it kafka bash
```

```bash
cd opt/kafka/bin/
```

```kafka
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic pos-datalake
```

* * *

**Beskrivelse:**

Pos system lavet i vuejs som via axios trækker produkter fra get request i nodejs backend.

Når der købes produkter i pos systemet, sendes de som json til post request i nodejs backend.

Og sendes via pipeline til lokalt kafka docker setup.

senere:
Kafka er vores message-queue, hvis der kommer for mange requests, kommer de blot i kø, derefter rendered og sendt korrekt til database.
