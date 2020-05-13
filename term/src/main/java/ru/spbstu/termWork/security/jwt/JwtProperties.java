package ru.spbstu.termWork.security.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {
    private String secretKey = "verySecretKey";
    private long validTime = 180000;

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public long getValidTime() {
        return validTime;
    }

    public void setValidTime(long validTime) {
        this.validTime = validTime;
    }
}
