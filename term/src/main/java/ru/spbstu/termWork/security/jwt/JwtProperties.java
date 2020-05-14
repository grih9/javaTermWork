package ru.spbstu.termWork.security.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.UUID;

@Configuration
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {
    private final String secretKey = UUID.randomUUID().toString();
    private long validTime = 180000;

    public String getSecretKey() {
        return secretKey;
    }

    public long getValidTime() {
        return validTime;
    }

    public void setValidTime(long validTime) {
        this.validTime = validTime;
    }
}
