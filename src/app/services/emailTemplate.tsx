import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface KoalaWelcomeEmailProps {
  userFirstname: string
  tokenConfirm: string
}

const baseUrl = process.env.NEXTAUTH_URL
  ? `http://${process.env.NEXTAUTH_URL}`
  : ''

export const KoalaWelcomeEmail = ({
  userFirstname,
  tokenConfirm,
}: KoalaWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      The sales intelligence platform that helps you uncover qualified leads.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/static/koala-logo.png`}
          width="170"
          height="50"
          alt="DevCode"
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Welcome to DevCode! To complete your registration, please click the
          link below to confirm your email. Thank you for being a part of our
          community
        </Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href={`${process.env.NEXTAUTH_URL}/api/email/confirm?token=${tokenConfirm}`}
          >
            Confirm email
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The DevCode team
        </Text>
        <Hr style={hr} />
        {/* <Text style={footer}>408 Warren Rd - San Mateo, CA 94402</Text> */}
      </Container>
    </Body>
  </Html>
)

export default KoalaWelcomeEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logo = {
  margin: '0 auto',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const btnContainer = {
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

// const footer = {
//   color: '#8898aa',
//   fontSize: '12px',
// }
