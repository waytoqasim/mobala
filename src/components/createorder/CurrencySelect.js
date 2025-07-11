const CurrencySelect = ({ Currencies, takecurrency, settakecurrency, iseditORder, mcOrderId, takecurrencyerr, settakecurrencyerr }) => (
    <Col>
      <InputGroup className="mb-3">
        <Form.Select
          style={takecurrencyerr !== "" ? styles.err : null}
          onChange={(e) => settakecurrency(e.target.value)}
          value={takecurrency}
          aria-label="Default select example"
          disabled={iseditORder || mcOrderId}
          onClick={() => settakecurrencyerr("")}
        >
          <option value="">Currency</option>
          {Currencies.map((item, key) => (
            <option value={item} key={key}>
              {item}
            </option>
          ))}
        </Form.Select>
      </InputGroup>
    </Col>
  );
  