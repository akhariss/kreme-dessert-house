import { StyleSheet, Platform } from 'react-native';
import { theme } from './theme';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background || '#F8F9FA',
  },
  header: {
    backgroundColor: theme.colors.white,
    paddingVertical: theme.spacing.xxl + 32,
    alignItems: 'center',
    borderBottomLeftRadius: theme.borderRadius.xl,
    borderBottomRightRadius: theme.borderRadius.xl,
    ...theme.shadows.medium,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: theme.fontSizes.xl,
    fontWeight: 'bold',
    color: theme.colors.black,
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray,
    marginBottom: theme.spacing.md,
  },
  formContainer: {
    padding: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: theme.spacing.lg,
    marginTop: theme.spacing.sm,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray,
    marginBottom: 6,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
    fontSize: theme.fontSizes.md,
    color: theme.colors.black,
  },
  actionButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    ...theme.shadows.small,
  },
  actionButtonText: {
    color: theme.colors.white,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.md,
  },
  logoutButton: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.warning,
  },
  logoutText: {
    color: theme.colors.warning,
    fontWeight: 'bold',
    fontSize: theme.fontSizes.md,
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  appVersion: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 'bold',
    color: theme.colors.black,
    marginBottom: 4,
  },
  appTagline: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray,
    fontStyle: 'italic',
    marginBottom: 2,
    textAlign: 'center',
  },
  copyright: {
    fontSize: 10,
    color: theme.colors.lightGray,
    marginTop: theme.spacing.sm,
  }
});
